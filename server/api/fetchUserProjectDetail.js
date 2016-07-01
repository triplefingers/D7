import model from "../db/models";
import collection from "../db/collections";

const fetchUserProjectDetail = (user, q, res)=>{
  // const userId = user.id;
  var { userProjectId } = q;
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

  /* data container to send */
  const result = {};

  model.UserProject.where("id", userProjectId).fetch({withRelated: [
    "user",
    "project",
    "posts",
    "transaction"
  ]})
  .then((userProject) => {
    userProject = userProject.toJSON();
    console.log("----here in userproject ", userProject);

    /* userProject id */
    result.userProjectId = userProject.id;

    /* project id, title, description, wishCount */
    result.projectId = userProject.project.id;
    result.projectTitle = userProject.project.title;
    result.projectDescription = userProject.project.description;
    result.wishCount = userProject.project.wishCount;

    /* username, userId, photo */
    result.userId = userProject.user.id;
    result.username = userProject.user.username;
    result.userPhoto = userProject.user.photo;

    /* startAt, endAt */
    result.startAt = userProject.startAt;
    result.endAt = userProject.endAt;

    /* status : ongoing(+doneToday), waiting, complete /and/ onDay */
    if (userProject.success) {
      /* success case */
      result.status = "success";
    } else {
      /* fail, ongoing, waiting case */
      const today = new Date();
      const startAt = new Date(userProject.startAt);
      let diff = today.valueOf() - startAt.valueOf();
      diff = Math.ceil(diff / (60 * 60 * 24 * 1000));
      if (diff > 0 && diff <= 7) {
        result.status = "ongoing";
        result.onDay = diff;
        result.doneToday = false;
        userProject.posts.forEach((item) => {
          if (item.day === diff) {
            result.doneToday = true;
          }
        });
      } else if (diff <= 0) {
        result.status = "waiting";
        result.onDay = diff;
      } else {
        result.status = "failed";
      }
    }

    /* wishcount */
    result.wishCount = userProject.project.wishCount;

    /* transaction : amount, currency, paymentDue */
    /* only if session's user.id === userProject.user.id */
    if (userId === result.userId) {
      result.others = false;
      result.transaction = {
        amount: userProject.transaction.amount,
        currency: userProject.transaction.currency,
        paymentDue: userProject.transaction.paymentDue
      };
    } else {
      result.others = true;
    }
  })
  .then(() => {
    /* posts + doneLike */
    return model.Post.where({userProjectId: userProjectId}).fetchAll({withRelated: [
      "user",
      "postImages",
      "likes",
      "reports"
    ]});
  })
  .then((posts) => {
    posts = posts.toJSON();
    result.posts = posts;
    if (!posts) {
      posts = [];
    }
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
        /* doneLike */
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

        /* project title, description */
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
          console.error("Error: Failed to read userProject data in fetchAllPosts: ", err);
          return err;
        });
      });
      postsPromiseArray.push(postPromise);
    });

    return Promise.all(postsPromiseArray)
    .then(() => {
      return posts;
    });
  })
  .then(() => {
    /* doneWish */
    result.doneWish = false;
    return model.Wish.where({userId: userId, projectId: result.projectId}).fetch()
    .then((wishes) => {
      if (!wishes) {
        result.doneWish = true;
      }
    })
    .catch((err) => "Failed to print doneWish: " + err);
  })
  .then(() => {
    return result;
  })
  .then((data) => res.status(200).send(data))
  .catch((err) =>{
    console.error("Error: Failed to read projects in 'fetchAllPosts.js': ", err);
    res.status(500).end();
  });

};

export default fetchUserProjectDetail;
