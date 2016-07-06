import model from "../db/models";
import collection from "../db/collections";

/* Fetch all projects from 'userProject' table */
/* Query: none */

const fetchAllProjects = (user, q, res)=>{
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

  const today = new Date();

  model.UserProject.where("userId", userId).fetchAll({withRelated: [
    "project",
    "posts"
  ]})
  .then((userProjects)=>{
    const result = {
      waiting: [],
      onGoing: [],
      complete: []
    };

    userProjects.forEach((userProject)=>{
      userProject = userProject.toJSON();
      let data = {
        id: userProject.id,
        title: userProject.project.title,
        description: userProject.project.description,
        image: userProject.project.image,
        startAt: userProject.startAt,
        endAt: userProject.endAt,
        success: userProject.success
      };

      /* Check Project status */
      let startAt = new Date(userProject.startAt);
      /* Calculate diff, the difference between today and the start Date */
      let diff = today.valueOf() - startAt.valueOf();
      diff = Math.ceil(diff / (60 * 60 * 24 * 1000));
      if ( diff > 0 && diff <= 7 && !data.success){
        data.onDay = diff;
        data.doneToday = false;
        userProject.posts.forEach((item)=>{
          if(item.day === diff){
            data.doneToday = true;
          }
        });
        result.onGoing.push(data);
      } else if ( diff <= 0 ){
        data.onDay = diff;
        result.waiting.push(data);
      } else {
        result.complete.push(data);
      }
    });

    return result;
  })
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) =>{
    console.error("Error: Failed to read projects in 'fetchAllProjects.js': ", err);
    res.status(500).end();
  });

};

export default fetchAllProjects;
