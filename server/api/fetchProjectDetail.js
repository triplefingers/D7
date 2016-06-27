import model from "../db/models";
import collection from "../db/collections";

const fetchProjectDetail = (user, q, res)=>{
  var userId = user.id
  var { id } = q;
  model.Post.where("userProjectId", id).fetchAll({withRelated: [
    "user",
    "postImages",
    "likes",
    "reports",
    "userProject"
  ]})
  .then((posts) => {
    posts = posts.toJSON();
    posts.forEach((post) => {
      /* userId, username */
      post.username = post.user.username;
      post.userPhoto = post.user.photo;
      delete post.user;

      /* postId */
      post.postId = post.id;

      /* project title*/
      model.UserProject.where("id", post.userProjectId).fetch({withRelated: ["project"]})
      .then((userProject) => {
        post.projectTitle = userProject.project.title;
        post.projectDescription = userProject.project.description;
      })
      .catch((err) => {
        console.error("Error: Failed to read userProject data in fetchAllPosts: ", err);
        return err;
      })
      delete post.userProject;

      /* userProjectId*/
      /* like */
      post.doneLike = false;
      post.likes.forEach((like) => {
        if (like.userId === userId) {
          post.doneLike = true;
        }
      });
      delete post.likes;

      /* report */
      post.doneReport = false;
      post.reports.forEach((report) => {
        if (report.userId === userId) {
          post.doneReport = true;
        }
      });
      delete post.reports;

      /* text, picture */
      let postImages = post.postImages;
      let newPostImages = [];
      postImages.forEach((postImage) => {
        newPostImages[postImage.index] = postImage.url;
      });
      post.publicIds = newPostImages;
      delete post.postImages;

      /* created_at */
      post.createdAt = post.created_at;
      delete post.created_at;
    });
    return posts;
  })
  .then((data) => res.status(200).send(data))
  .catch((err) => console.log("Error: Cannot read projectDetails from db in 'fetchProjectDetail.js'", err));
};

export default fetchProjectDetail;
