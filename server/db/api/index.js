import fetchAllProjects from "./projects";

const handler = (apiMethod)=>{
  return (req, res, next) => {
    let url = req.path;
    let query = req.query;
    let body = req.body;

    if (Object.keys(body).length===0){
      console.log("Request GET for ", url, query);
      apiMethod(url, query);
    } else {
      console.log("Request POST to ", url, query, "to write", body);
      apiMethod(url, query, body);
    }
  };
};

export default {
  handler: handler,
  fetchAllProjects: fetchAllProjects,
};
