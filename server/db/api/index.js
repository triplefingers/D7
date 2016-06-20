import fetchAllProjects from "./fetchAllProjects";
import fetchOngoingProjects from "./fetchOngoingProjects";
import fetchRecommendedProjects from "./fetchRecommendedProjects";


const handler = (apiMethod)=>{
  return (req, res, next) => {
    let url = req.path;
    let query = req.query;
    let body = req.body;

    if (Object.keys(body).length===0){
      console.log("Request GET for ", url, query);
      apiMethod(url, query, res);
    } else {
      console.log("Request POST to ", url, query, "to write", body);
      apiMethod(url, query, body, res);
    }
  };
};

export default {
  handler: handler,
  fetchAllProjects: fetchAllProjects,
  fetchOngoingProjects: fetchOngoingProjects,
  fetchRecommendedProjects: fetchRecommendedProjects
};
