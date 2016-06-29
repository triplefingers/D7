import model from "../db/models";
import collection from "../db/collections";

const fetchOngoingProjects = (user, q, res) => {
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

  model.UserProject.where("userId", userId).orderBy("-created_at").fetchAll({withRelated: [
    "project",
    "posts"
  ]})
  .then((userProjects) => {
    userProjects = userProjects.toJSON();
    console.log("-----------userProjects are", userProjects);
    const today = new Date();

    /* ongoing list */
    const result = [];

    userProjects.forEach((userProject) => {
      // userProject = userProject.toJSON();
      const data = {
        id: userProject.id,
        title: userProject.project.title,
        description: userProject.project.description,
        success: userProject.project.success
      };

      /* Check Project status : doneToday /and/ count as total, success, fail */
      const startAt = new Date(userProject.startAt);
      const diff = Math.ceil((today.valueOf() - startAt.valueOf()) / (60 * 60 * 24 * 1000));
      if (!userProject.success && diff > 0 && diff <= 7) {
        data.onDay = diff;
        data.doneToday = false;
        userProject.posts.forEach((item) => {
          if (item.day === diff) {
            data.doneToday = true;
          }
        });
        result.push(data);
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
