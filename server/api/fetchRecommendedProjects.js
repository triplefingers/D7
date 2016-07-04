import model from "../db/models";
import collection from "../db/collections";

const fetchRecommendedProjects = (user, q, res) => {
  // const userId = user.id;
  const { page } = q;

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

  model.Project.forge().orderBy("-wishCount").fetchPage({
    pageSize: 20,
    page: page,
    withRelated: [
      "user",
      "wishes"
    ]
  })
  .then((projects)=>{
    projects = projects.toJSON();
    console.log("Now fetching.... projects are", projects);

    projects.forEach((project) => {
      /* username, userPhoto */
      project.username = project.user.username;
      project.userPhoto = project.user.userPhoto;
      delete project.user;

      /* doneWish */
      project.doneWish = false;
      project.wishes.forEach((wish) => {
        if (wish.userId === userId) {
          project.doneWish = true;
        }
      });
      delete project.wishes;
    });
    return projects;
  })
  .then((data) => {
    console.log("----------------res is ", res);
    res.status(200).send(data);
  })
  .catch((err) => {
    console.error("Error: Failed to read projects in 'fetchRecommendedProjects.js': ", err);
    res.status(500).end();
  });
};

export default fetchRecommendedProjects;
