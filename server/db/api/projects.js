import model from "../models";
import collection from "../collections";

const fetchAllProjects = (url, q, res)=>{
  var { userId } = q;
  console.dir(collection.UserProjects);
  const result = [];
  let up = model.UserProject.where("userId", userId).fetchAll({withRelated: [
    "project",
    "post"
  ]}).then((projects)=>{
    const result = {
      waiting: [],
      ongoing: [],
      complete: []
    };
    const today = new Date();
    projects.forEach((up)=>{
      console.log(">>>>>>>>>>>>>>>>>>>>>", up.id);
      // let project = up.related("project").toJSON();
      // let post = up.related("post").toJSON();
      // console.log('POST', post);
      up = up.toJSON();
      let startAt = new Date(up.startAt);
      let data = {
        id: up.id,
        title: up.project.title,
        description: up.project.description
      };

      /* Check Project status */
      console.log(today.valueOf());
      console.log(startAt.valueOf());
      let diff = today.valueOf() - startAt.valueOf();
      diff = Math.ceil(diff/(60*60*24*1000));
      console.log('DIFF', diff);
      if ( diff <= 0 ){
        result.waiting.push(data);
      } else if ( diff > 0 && diff <= 7 ){
        data.onDay = diff;
        data.todayDone = false;
        up.post.forEach((item)=>{
          if(item.day === diff){
            data.todayDone = true;
          }
        });
        result.ongoing.push(data);
      } else {
        result.complete.push(data);
      }
    });
    return result;
  }).then((data)=>res.status(200).send(data));

};

export default fetchAllProjects;
