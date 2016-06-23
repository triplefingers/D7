import model from "../db/models";
import collection from "../db/collections";

const createNewProject = (user, q, body, res) => {
  const userId = user.id;
  const { title, description, startAt } = body;
  const today = new Date();
  const startAtInObj = new Date(startAt);

  let endAt = new Date(startAt);
  endAt.setDate(startAtInObj.getDate() + 6);
  endAt = endAt.toJSON().slice(0, 10);

  let onDay = null;
  if (today.toJSON().slice(0, 10) === startAtInObj.toJSON().slice(0, 10)) {
    onDay = 1;
  }

  model.Project.forge().set({
    title: title,
    description: description
  }).save()
  .then((project) => {
    const projectId = project.id;
    model.UserProject.forge().set({
      userId: userId,
      projectId: projectId,
      startAt: startAt,
      endAt: endAt
    }).save()
    .then((userProject) => {
      res.send({
        id: userProject.id,
        title: title,
        description: description,
        onDay: onDay
      });
    })
    .catch((err) => console.error("-----Error: Failed to store in 'userProject' table: ", err));
  })
  .catch((err) => {
    console.error("-----Error: Failed to store in 'project' or 'userProject' table: ", err);
    res.status(500).end();
  });
};

export default createNewProject;
