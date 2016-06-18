import model from "../models";
import collection from "../collections";

const fetchAllProjects = (url, q)=>{
  // var { userId } = q;
  console.dir(collection.UserProjects);
  let up = model.UserProject.fetchAll().then((project)=>{
    console.log(project);
  });
};

export default fetchAllProjects;
