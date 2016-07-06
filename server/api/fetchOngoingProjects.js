import model from "../db/models";
import collection from "../db/collections";

/* Fetch all projects from 'userProject' table */
/* Query: none */

const fetchOngoingProjects = (user, q, res) => {
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

  /* Start point */
  model.UserProject.where("userId", userId).orderBy("-created_at").fetchAll({withRelated: [
    "project",
    "posts"
  ]})
  .then((userProjects) => {
    userProjects = userProjects.toJSON();
    const today = new Date();

    /* ongoing list */
    const result = [];

    userProjects.forEach((userProject) => {
      /* tempData */
      const tempData = {
        id: userProject.id,
        title: userProject.project.title,
        description: userProject.project.description,
        image: userProject.project.image,
        success: userProject.project.success
      };

      /* Check Project status : doneToday /and/ count as total, success, fail */
      const startAt = new Date(userProject.startAt);
      /* Calculate diff, the difference between today and the start Date */
      const diff = Math.ceil((today.valueOf() - startAt.valueOf()) / (60 * 60 * 24 * 1000));
      if (!userProject.success && diff > 0 && diff <= 7) {
        tempData.onDay = diff;
        tempData.doneToday = false;
        userProject.posts.forEach((post) => {
          if (post.day === diff) {
            tempData.doneToday = true;
          }
        });
        result.push(tempData);
      }
    });

    return result;
  })
  .then((data) => res.status(200).send(data))
  .catch((err) => {
    console.error("Error: Failed to read projects in 'fetchOngoingProjects.js'");
    res.status(500).end();
  });
};

export default fetchOngoingProjects;
