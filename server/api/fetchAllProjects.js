import model from "../db/models";
import collection from "../db/collections";

const fetchAllProjects = (user, q, res)=>{
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

  model.UserProject.where("userId", userId).fetchAll({withRelated: [
    "project",
    "posts"
  ]})
  .then((projects)=>{
    const today = new Date();
    const result = {
      waiting: [],
      ongoing: [],
      complete: []
    };

    projects.forEach((up)=>{
      up = up.toJSON();
      let data = {
        id: up.id,
        title: up.project.title,
        description: up.project.description,
        startAt: up.startAt,
        endAt: up.endAt,
        success: up.success
      };

      /* Check Project status */
      let startAt = new Date(up.startAt);
      let diff = today.valueOf() - startAt.valueOf();
      diff = Math.ceil(diff/(60*60*24*1000));
      if ( diff > 0 && diff <= 7 && !data.success){
        data.onDay = diff;
        data.doneToday = false;
        up.posts.forEach((item)=>{
          if(item.day === diff){
            data.doneToday = true;
          }
        });
        result.ongoing.push(data);
      } else if ( diff <= 0 ){
        data.onday = diff;
        result.waiting.push(data);
      } else {
        result.complete.push(data);
      }
    });
    return result;
  })
  .then((data) => res.status(200).send(data))
  .catch((err) =>{
    console.error("Error: Failed to read projects in 'fetchAllProjects.js': ", err);
    res.status(500).end();
  });

};

export default fetchAllProjects;
