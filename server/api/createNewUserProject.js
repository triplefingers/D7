import model from "../db/models";
import collection from "../db/collections";
import paymentReq from "./payment";

const createNewUserProject = (user, q, body, res) => {
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

  const { projectId, startAt, payment } = body;

  /* if the payment is failed, should del and userProject */
  /* by using id below */
  let userProjectId;


  // console.log("------------projecgid and startat: ", projectId, " ", startAt, " ", typeof(startAt));
  const today = new Date();
  const startAtInObj = new Date(startAt);
  // console.log("body is, ", body, typeof(body), Object.keys(body));
  // console.log("before slice, ", today, startAtInObj, startAt);

  let endAt = new Date(startAt);
  endAt.setDate(startAtInObj.getDate() + 6);
  endAt = endAt.toJSON().slice(0, 10);

  let onDay = null;
  if (today.toJSON().slice(0, 10) === startAtInObj.toJSON().slice(0, 10)) {
    onDay = 1;
  }

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
      console.log("Method use: Return createNewUserProject Result: ", data);
      return data;
    } else {
      res.status(200).send(data);
    }
  })
  .catch((err) => {
    console.error("-----Error: Failed to store in 'project' or 'userProject' table: ", err);

    /* delete project, userproject */
    new model.UserProject({id: userProjectId}).destroy()
    .then(() => {
      console.log("deleted false userproject info");
    })
    .catch((err) => {
      console.error("Error: Failed to revert project and userproject");
    });
    /* If res === null or res === undefined, just return data */
    if (!res) {
      return data;
    } else {
      res.status(500).send({donePayment: false}).end();
    }
  });
};

export default createNewUserProject;
