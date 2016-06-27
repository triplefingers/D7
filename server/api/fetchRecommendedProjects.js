import model from "../db/models";
import collection from "../db/collections";

const fetchRecommendedProjects = (user, q, res) => {
  collection.Projects.orderBy("-wishCount").fetch({withRelated: ["user" , "wish"]})
  .then((projects)=>{
    console.log("Now fetching.... projects are", projects);
    return projects.slice(0, 20);
  })
  .then((data) => res.status(200).send(data))
  .catch((err) => {
    console.error("Error: Failed to read projects in 'fetchRecommendedProjects.js': ", err);
    res.status(500).end();
  });
};

export default fetchRecommendedProjects;
