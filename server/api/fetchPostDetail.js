import model from "../db/models";
import collection from "../db/collections";

const fetchPostDetail = (user, q, res)=>{
  // const userId = user.id;
  const postId = q.id;

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

  model.Post.where("id", postId).fetch({withRelated: [
    "user",
    "postImages",
    "likes",
    "reports",
    "project",
    "userProject"
  ]})
  .then((post) => {
    post = post[0];
    const result = {
      username: post.user.username,
      userPhoto: post.user.photo,

    };






    result.posts = posts.toJSON();

    const postsPromiseArray = [];

    result.posts[0]

    result.posts.forEach((post) => {
      /* make thenable promise object */
      let postPromise = new Promise((resolve, reject) => {
        /* userId, username */
        post.username = post.user.username;
        post.userPhoto = post.user.photo;
        delete post.user;

        /* postId */
        post.postId = post.id;

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

export default fetchPostDetail
