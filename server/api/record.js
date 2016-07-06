import model from "../db/models";
import collection from "../db/collections";
import db from "../db/config/setConfig";
import createNewProject from "./createNewProject";
import paymentCancelReq from "./paymentCancel";
import Promise from "bluebird";

/* Create new post in 'post' table and if the req has new Project, create new project in 'project' table first */
/* Post Data: id, onDay, text, publicIds(array), newProject(object) */

const record = (user, q, body, res) => {
  const userId = user.id;

  // Test code below
  // let userId;
  // if (user && user.id) {
  //   userId = user.id;
  // }
  // if (q && q.id) {
  //   userId = q.id;
  // } else {
  //   userId = 1;
  // }

  let { id, onDay, text, publicIds, newProject } = body;
  const data = {
    userId: userId,
    projectId: undefined,
    userProjectId: id,
    day: onDay,
    text: text
  };

  /* If newProject is sent with record data, */
  /* create newProject first before record dayDetail */
  let createNewProjectPromise = () => {
    return new Promise((resolve, reject) => {
      resolve();
    });
  };
  if ((id === undefined || id === null) && newProject) {
    createNewProjectPromise = () => {
      const parsedNewProject = JSON.parse(newProject);
      return new Promise.resolve(createNewProject(user, q, parsedNewProject, null))
      .then((project) => {
        return project;
      });
    };
  }

  /* Parse and rearrange 'publicIds' array */
  publicIds = JSON.parse(publicIds).map((publicId, index) => {
    return {index: index, url: publicId};
  });

  createNewProjectPromise()
  .then((newUserProject) => {
    /* check if newProject is sent, and if so */
    /* assign 'newProject.id' to 'id' */
    if (newUserProject) {
      id = newUserProject.id;
      data.userProjectId = id;
    }
    return model.UserProject.where("id", id).fetch();
  })
  .then((userProject) => {
    userProject = userProject.toJSON();
    data.projectId = userProject.projectId;
    return model.Post.forge().set(data).save()
    .then((post) => post);
  })
  .then((post) => {
    publicIds.forEach((publicId) => {
      publicId.postId = post.id;
    });
    /* check if the length of publicIds array is 0 */
    /* if 0, do not execute knex.insert, or it will print out error like below */
    /* { Error:  - SQLITE_MISUSE: not an error at Error (native) errno: 21, code: 'SQLITE_MISUSE' } */
    if (publicIds.length < 1) {
      return post;
    } else {
      return db.knex.insert(publicIds).into("postImage")
        .then(() => {
          return post;
        })
        .catch((err) => console.error("Error: Failed to store postImages in db in 'record.js': ", err));
    }
  })
  .then((post) => {
    // console.log("----------post here is 111", post);
    post = post.toJSON();
    return model.UserProject.where({id: post.userProjectId}).fetch()
    .then((userProject) => {
      userProject = userProject.toJSON();
      let postDate = new Date(post.created_at).toJSON().slice(0, 10);
      let endDate = userProject.endAt;
      console.log("postdate and enddate", postDate, endDate);
      /* check if the date of posting is same with endDate of the userProject */
      /* and if so, update success col of userProject, from false to true */
      if (postDate === endDate) {
        return model.Transaction.where({userProjectId: post.userProjectId}).fetch()
        .then((transaction) => {
          transaction = transaction.toJSON();
          const body = {
            customer_uid: transaction.customer_uid,
            merchant_uid: transaction.merchant_uid
          };
          return paymentCancelReq(null, null, body, null)
          .then((answer) => {
            post.doneCancelPayment = true;
          });
        })
        .then(() => {
          return new model.Transaction({userProjectId: post.userProjectId}).save({refund: true});
        })
        .then(() => {
          return new model.UserProject({id: post.userProjectId}).save({success: true});
        })
        .then(() => {
          return post;
        })
        .catch((err) => {
          console.error("Error: Failed to change userProject S/U status in 'record.js': ", err);
          return err;
        });
      } else {
        return post;
      }
    });
  })
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    console.error("Error: Failed to store dayDetail in db in 'record.js': ", err);
    res.status(500).end();
  });
};

export default record;
