import model from "../db/models";
import collection from "../db/collections";

const fetchOngoingProjects = (url, q, res) => {
  const { userId } = q;
  console.dir(collection.UserProjects);
  model.UserProject.where("userId", userId).fetchAll({withRelated: [
    "project",
    "post"
  ]})
  .then((projects) => {
    // result is 'Ongoing projects'
    const result = [];
    const today = new Date();
    projects.forEach((up) => {
      // console.log(">>>>>>>>>>>>>>>>>>>>>", up.id);
      up = up.toJSON();
      const startAt = new Date(up.startAt);
      const data = {
        id: up.id,
        title: up.project.title,
        description: up.project.description
      };

      /* Check Project status */
      // console.log(today.valueOf());
      // console.log(startAt.valueOf());

      const diff = Math.ceil((today.valueOf() - startAt.valueOf()) / (60 * 60 * 24 * 1000));
      console.log("DIFF ", diff);
      if (diff > 0 && diff <= 7) {
        data.onDay = diff;
        data.doneToday = false;
        up.post.forEach((item) => {
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
    console.error("-----Error: Failed to read projects in 'fetchOngoingProjects'");
    res.status(500).end();
  });
};

export default fetchOngoingProjects;
