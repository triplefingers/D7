import model from "../db/models";
import collection from "../db/collections";

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

  const { projectId, startAt } = body;
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

  return model.UserProject.forge().set({
    userId: userId,
    projectId: projectId,
    startAt: startAt,
    endAt: endAt
  }).save()
  .then((userProject) => {
    const data = {
      id: userProject.id,
      title: title,
      description: description,
      onDay: onDay
    };

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

    /* If res === null or res === undefined, just return data */
    if (!res) {
      return data;
    } else {
      res.status(500).end();
    }
  });
};

export default createNewUserProject;
