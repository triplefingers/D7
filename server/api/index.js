/* data fetching */
import fetchUser from "./fetchUser";
import fetchAllProjects from "./fetchAllProjects";
import fetchOngoingProjects from "./fetchOngoingProjects";
import fetchRecommendedProjects from "./fetchRecommendedProjects";
import fetchWishProjects from "./fetchWishProjects";
import fetchProjectDetail from "./fetchProjectDetail";
import fetchUserProjectDetail from "./fetchUserProjectDetail";
import fetchRecentPosts from "./fetchRecentPosts";
import fetchPopularPosts from "./fetchPopularPosts";

/* data create */
import createNewProject from "./createNewProject";
import createNewUserProject from "./createNewUserProject";
import record from "./record";
import like from "./like";
import report from "./report";
import wish from "./wish";
import user from "./user";
import payment from "./payment";
import paymentCancel from "./paymentCancel";

/* handler */
const handler = (apiMethod)=>{
  return (req, res, next) => {
    let url = req.path;
    let query = req.query;
    let body = req.body;
    let user = req.user;

    /* check the req's method by extract the keys of Object 'data' */
    if (Object.keys(body).length===0){
      console.log("Request GET for ", url, query, "by", user);
      apiMethod(user, query, res);
    } else {
      console.log("Request POST to ", url, query, "to write", body, "by", user);
      apiMethod(user, query, body, res);
    }
  };
};

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
  payment: payment,
  paymentCancel: paymentCancel
};
