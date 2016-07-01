import model from "../db/models";
import collection from "../db/collections";

const fetchWishProjects = (user, q, res) => {
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

  /* data container to send */
  let result;

  model.Wish.where("id", userId).orderBy("-created_at").fetchAll({withRelated: [
    "user",
    "project"
  ]})
  .then((wishes) => {
    wishes = wishes.toJSON();
    result = [];

    wishes.forEach((wish) => {
      let data = {};
      /* project id, title, description, wishCount, created_at, updated_at */
      const project = wish.project;
      data.id = project.id;
      data.title = project.title;
      data.description = project.description;
      data.wishCount = project.wishCount;
      data.created_at = data.createAt = project.created_at;
      data.updated_at = data.updatedAt = project.updated_at;

      /* userId, username */
      data.userId = wish.userId;
      data.username = wish.user.username;
      /* doneWish */
      data.doneWish = true;

      result.push(data);
    });
    return result;
  })
  .then((data) => res.status(200).send(data))
  .catch((err) => {
    console.error("Error: Failed to read projects in 'fetchRecommendedProjects.js': ", err);
    res.status(500).end();
  });
};

export default fetchWishProjects;
