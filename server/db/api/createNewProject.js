import model from "../models";
import collection from "../collections";


const createNewProject = (url, q, body, res) => {
  const { userId, title, description, startAt } = body;
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
    });
  });
};

export default createNewProject;
