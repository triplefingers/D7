import model from "../db/models";
import collection from "../db/collections";

const fetchRecommendedProjects = (url, q, res) => {
  collection.Projects.orderBy("-wish").fetch().then((projects)=>{
    return projects.slice(0, 4);
  }).then((data)=>res.status(200).send(data));
};

export default fetchRecommendedProjects;
