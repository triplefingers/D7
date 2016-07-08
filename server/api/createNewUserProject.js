import model from "../db/models";
import collection from "../db/collections";
import paymentRequest from "./payment";

/* Create new project in 'userProject' tables */
/* Post Data: projectId, startAt, payment */

const createNewUserProject = (user, q, body, res) => {
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

  /* If the payment is failed, delete userProject */
  /* by using ids below */
  let userProjectId;

  const { projectId, startAt, payment } = body;

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
  return model.UserProject.forge().set({
    userId: userId,
    projectId: projectId,
    startAt: startAt,
    endAt: endAt
  }).save()
  .then((userProject) => {
    userProjectId = userProject.id;

    const data = {
      id: userProject.id,
      onDay: onDay,
      endAt: endAt,
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
      console.log("Methodical use: Return createNewUserProject Result: ", data);
      return data;
    } else {
      res.status(200).send(data);
    }
  })
  .catch((err) => {
    /* If the process fails, including payment process, rollback */
    console.error("Error: Failed to store in 'project' or 'userProject' table: ", err);

    /* Delete project, userproject */
    new model.UserProject({id: userProjectId}).destroy()
    .then(() => {
      console.log("deleted false userproject info");
    })
    .catch((err) => {
      console.error("Error: Failed to revert project and userproject");
    });

    /* Return err, if res === null or res === undefined */
    if (!res) {
      return data;
    } else {
      res.status(500).send({donePayment: false}).end();
    }
  });
};

export default createNewUserProject;
