import model from "../db/models";
import collection from "../db/collections";
import paymentRequest from "./payment";

/* Create new project in 'project' and 'userProject' tables */
/* Post Data: title, description, startAt, image, payment */

const createNewProject = (user, q, body, res) => {
  const userId = user.id;

  // Test code below
  // let userId;
  // if (user && user.id) {
  //   userId = user.id;
  // }
  // if (q && q.id) {
  //   userId = q.id;
  // } else {
  //   userId = 1;
  // }

  /* If the payment is failed, delete project and userProject */
  /* by using ids below */
  let projectId, userProjectId;

  const { title, description, startAt, image, payment } = body;
  const today = new Date();
  const startAtInObj = new Date(startAt);

  /* endAt = startAt + 6 days */
  let endAt = new Date(startAt);
  endAt.setDate(startAtInObj.getDate() + 6);
  endAt = endAt.toJSON().slice(0, 10);

  /* If startAt is today, assign 1 to 'onDay'. Otherwise, null */
  let onDay = null;
  if (today.toJSON().slice(0, 10) === startAtInObj.toJSON().slice(0, 10)) {
    onDay = 1;
  }

  /* Start Point */
  return model.Project.forge().set({
    userId: userId,
    title: title,
    description: description,
    image: image
  }).save()
  .then((project) => {
    projectId = project.id;

    return model.UserProject.forge().set({
      userId: userId,
      projectId: projectId,
      startAt: startAt,
      endAt: endAt
    }).save();
  })
  .then((userProject) => {
    userProject = userProject.toJSON();
    userProjectId = userProject.id;
    const data = {
      id: userProject.id,
      title: title,
      description: description,
      onDay: onDay,
      endAt: userProject.endAt,
      donePayment: false
    };
    return data;
  })
  .then((data) => {
    const postData = {
      userProjectId: data.id,
      endAt: data.endAt,
      payment: payment
    };

    /* If postData.payment is not parsed, it will be parsed below */
    if (typeof postData.payment === "string") {
      postData.payment = JSON.parse(postData.payment);
    }

    /* Send payment Request through 'payment.js' */
    return paymentRequest(user, null, postData, null)
    .then((answer) => {
      data.donePayment = true;
      return data;
    });
  })
  .then((data) => {
    /* Return data, if res === null or res === undefined */
    if (!res) {
      console.log("Methodical use: Return createNewProject Result: ", data);
      return data;
    } else {
      res.status(200).send(data);
    }
  })
  .catch((err) => {
    /* If the process fails, including payment process, rollback */
    console.error("Error: Failed to store in 'project' or 'userProject' table: ", err);

    /* Delete project, userproject */
    new model.Project({id: projectId}).destroy()
    .then(() => {
      console.log("deteted false project info");
      console.log("now deleting false userproject info");
      new model.UserProject({id: userProjectId}).destroy();
    })
    .catch((err) => {
      console.error("Error: Failed to revert project and userproject");
    });

    /* Return err, if res === null or res === undefined */
    if (!res) {
      return err;
    } else {
      res.status(500).send({donePayment: false}).end();
    }
  });
};

export default createNewProject;
