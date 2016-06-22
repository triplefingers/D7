import model from "../models";
import collection from "../collections";

const fetchAllProjects = (url, q, res)=>{
  var { userId } = q;
  model.UserProject.where("userId", userId).fetchAll({withRelated: [
    "project",
    "post"
  ]})
  .then((projects)=>{
    const result = {
      waiting: [],
      ongoing: [],
      complete: []
    };
    const today = new Date();
    projects.forEach((up)=>{
      up = up.toJSON();
      let startAt = new Date(up.startAt);
      let data = {
        id: up.id,
        title: up.project.title,
        description: up.project.description
      };

      /* Check Project status */
      let diff = today.valueOf() - startAt.valueOf();
      diff = Math.ceil(diff/(60*60*24*1000));
      if ( diff <= 0 ){
        result.waiting.push(data);
      } else if ( diff > 0 && diff <= 7 ){
        data.onDay = diff;
        data.doneToday = false;
        up.post.forEach((item)=>{
          if(item.day === diff){
            data.doneToday = true;
          }
        });
        result.ongoing.push(data);
      } else {
        result.complete.push(data);
      }
    });
    return result;
  })
  .then((data) => res.status(200).send(data))
  .catch((err) =>{
    console.error("-----Error: Failed to read projects in 'fetchAllProjects.js': ", err);
    res.status(500).end();
  });

};

export default fetchAllProjects;
