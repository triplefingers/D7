import dummy from "../db/temp";

import fetchUser from "./fetchUser";
import fetchAllProjects from "./fetchAllProjects";
import fetchOngoingProjects from "./fetchOngoingProjects";
import fetchRecommendedProjects from "./fetchRecommendedProjects";
import fetchWishProjects from "./fetchWishProjects";
import fetchProjectDetail from "./fetchProjectDetail";
import fetchUserProjectDetail from "./fetchUserProjectDetail";
import fetchRecentPosts from "./fetchRecentPosts";
import fetchPopularPosts from "./fetchPopularPosts";
import createNewProject from "./createNewProject";
import createNewUserProject from "./createNewUserProject";
import record from "./record";
import like from "./like";
import report from "./report";
import wish from "./wish";
import user from "./user";
import payment from "./payment";

// var payment = (user, q, body, res) => {
//
// }

const handler = (apiMethod)=>{
  return (req, res, next) => {
    let url = req.path;
    let query = req.query;
    let body = req.body;
    let user = req.user;

    if (Object.keys(body).length===0){
      console.log("Request GET for ", url, query, "by", user);
      apiMethod(user, query, res);
    } else {
      console.log("Request POST to ", url, query, "to write", body, "by", user);
      apiMethod(user, query, body, res);
    }
  };
};

/* 임시 자료 */
// var fetchOngoingProjects = (user, q, res) => {
//   var data = {};
//   data.count = {
//     total: 9,
//     success: 7,
//     fail: 3
//   }
//   data.ongoing = dummy.all.ongoing;
//   res.status(200).send(data);
// };
// var fetchAllProjects = (user, q, res) => {
//   var data = dummy.all;
//   res.status(200).send(data);
// }
// var fetchRecommendedProjects = (user, q, res) => {
//   var data = {};
//   data = dummy.recommended;
//   res.status(200).send(data);
// };
// var fetchWishProjects = (user, q, res) => {
//   var data = {};
//   data = dummy.wish;
//   res.status(200).send(data);
// };
// var fetchProjectDetail = (user, q, res) => {
//   var data = {};
//   data = dummy.project;
//   res.status(200).send(data);
// };


export default {
  handler: handler,
  fetchUser: fetchUser,
  fetchAllProjects: fetchAllProjects,
  fetchOngoingProjects: fetchOngoingProjects,
  fetchRecommendedProjects: fetchRecommendedProjects,
  fetchWishProjects: fetchWishProjects,
  fetchProjectDetail: fetchProjectDetail,
  fetchRecentPosts: fetchRecentPosts,
  fetchPopularPosts: fetchPopularPosts,
  fetchUserProjectDetail: fetchUserProjectDetail,
  createNewProject: createNewProject,
  createNewUserProject: createNewUserProject,
  record: record,
  like: like,
  report: report,
  wish: wish,
  user: user,
  payment: payment
};
