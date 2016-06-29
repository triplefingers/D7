import model from "../db/models";
import collection from "../db/collections";
import db from "../db/config/setConfig";

const wish = (user, q, body, res) => {
  // const userId = user.id;
  let userProjectId = body.userProjectId;
  let projectId = body.projectId;

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

  let wishData;

  if (userProjectId !== undefined) {
    wishData = () => {
      return model.UserProject.where("id", userProjectId).fetch()
      .then((userProject) => {
        if (userProject) {
          userProject = userProject.toJSON();
          projectId = userProject.projectId;
          return model.Wish.where({userId: userId, projectId: projectId}).fetch();
        } else {
          throw "Invalid userProjectId";
        }
      });
    };
  } else if (projectId !== undefined) {
    wishData = () => {
      return model.Wish.where({userId: userId, projectId: projectId}).fetch();
    };
  } else {
    console.error("Error: Invalid body.data");
  }

  wishData().then((wish) => {
    if (wish) {
      return new model.Wish({id: wish.id}).destroy();
    } else {
      return new model.Wish({userId: userId, projectId: projectId}).save();
    }
  })
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    console.error("Error: Failed to store wish info in Wish Table in 'wish.js': ", err);
    res.status(500).end();
  });

};

export default wish;
