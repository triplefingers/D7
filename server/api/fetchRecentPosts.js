import model from "../db/models";
import collection from "../db/collections";
import Promise from "bluebird";

const fetchRecentPosts = (user, q, res)=>{
  // const userId = user.id;

  // below should be deleted
  let userId;
  if (user && user.id) {
    userId = user.id;
  }
  if (q && q.id) {
    userId = q.id;
  } else {
    userId = 1;
  }

  collection.Posts.orderBy("-created_at").fetch({withRelated: [
    "user",
    "userProject",
    "postImages",
    "likes",
    "reports"
  ]})
  .then((posts)=>{
    posts = posts.toJSON();
    console.log("posts in recent tab is ", posts);
    const postsPromiseArray = [];

    posts.forEach((post) => {
      /* make thenable promise object */
      let postPromise = new Promise((resolve, reject) => {
        /* userId, username */
        post.username = post.user.username;
        post.userPhoto = post.user.photo;
        delete post.user;

        /* postId */
        // post.postId = post.id;

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

        /* created_at, updated_at */
        post.createdAt = post.created_at;
        post.updatedAt = post.updated_at;
        delete post.created_at;
        delete post.updated_at;

        /* project title, description*/
        model.UserProject.where("id", post.userProjectId).fetch({withRelated: ["project"]})
        .then((userProject) => {
          userProject = userProject.toJSON();
          post.projectTitle = userProject.project.title;
          post.projectDescription = userProject.project.description;
        })
        .then(() => {
          console.log("-------in postsPromissarray promise.all--------", post);
          delete post.userProject;
          resolve();
        })
        .catch((err) => {
          console.error("Error: Failed to read userProject data in 'fetchRecentPosts.js': ", err);
          return err;
        })
      })
      postsPromiseArray.push(postPromise);
    });

    return Promise.all(postsPromiseArray)
    .then(() => {
      console.log("-------posts are", posts);
      return posts.slice(0, 20);
    })
  })
  .then((data) => res.status(200).send(data))
  .catch((err) =>{
    console.error("-----Error: Failed to read projects in 'fetchRecentPosts.js': ", err);
    res.status(500).end();
  });

};

export default fetchRecentPosts;
