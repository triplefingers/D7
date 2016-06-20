import model from "../models";
import collection from "../collections";

const fetchProjectDetail = (url, q, res)=>{
  var { id } = q;
  model.Post.where("userProjectId", id).fetchAll().then((projects)=>{
    return projects;
  }).then((data)=>res.status(200).send(data));
};

export default fetchProjectDetail;
