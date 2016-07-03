import model from "../db/models";
import collection from "../db/collections";
import paymentReq from "./payment";
import Promise from "bluebird";

const createNewProject = (user, q, body, res) => {
  console.log("------variable iin createNewProject is ", user, q, body, " typeof body is ", typeof(body), res);

  // const userId = user.id;

  // below should be deleted
  let userId;
  if (user && user.id) {
    userId = user.id;
  }
  if (q && q.id) {
    userId = q.id;
  } else {
    userId = 1;
  }

  /* if the payment is failed, should del project and userProject */
  /* by using ids below */
  let projectId, userProjectId;

  const { title, description, startAt, payment } = body;
  const today = new Date();
  const startAtInObj = new Date(startAt);
  console.log("body is, ", body, typeof(body), Object.keys(body));
  console.log("before slice, ", today, startAtInObj, startAt);

  let endAt = new Date(startAt);
  endAt.setDate(startAtInObj.getDate() + 6);
  endAt = endAt.toJSON().slice(0, 10);

  let onDay = null;
  if (today.toJSON().slice(0, 10) === startAtInObj.toJSON().slice(0, 10)) {
    onDay = 1;
  }

  return model.Project.forge().set({
    userId: userId,
    title: title,
    description: description
  }).save()
  .then((project) => {
    projectId = project.id;
    return model.UserProject.forge().set({
      userId: userId,
      projectId: projectId,
      startAt: startAt,
      endAt: endAt
    }).save();

    // .catch((err) => console.error("-----Error: Failed to store in 'userProject' table: ", err));
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
    const body = {
      userProjectId: data.id,
      endAt: data.endAt,
      payment: payment
    };
    console.log("----before paymentReq, body is ",  body);
    return paymentReq(null, null, body, null)
    .then((answer) => {
      data.donePayment = true;
      return data;
    });
  })
  .then((data) => {
    /* If res === null or res === undefined, just return data */
    if (!res) {
      console.log("Method use: Return createNewProject Result: ", data);
      return data;
    } else {
      res.status(200).send(data);
    }
  })
  .catch((err) => {
    console.error("-----Error: Failed to store in 'project' or 'userProject' table: ", err);

    /* delete project, userproject */
    new model.Project({id: projectId}).destroy()
    .then(() => {
      console.log("now deleting false project info");
      new model.UserProject({id: userProjectId}).destroy();
    })
    .catch((err) => {
      console.error("Error: Failed to revert project and userproject");
    });
    /* If res === null or res === undefined, just return err */
    if (!res) {
      return err;
    } else {
      res.status(500).end();
    }
  });
};

export default createNewProject;
