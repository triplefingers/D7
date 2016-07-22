import model from "../db/models";
import collection from "../db/collections";
import Promise from "bluebird";

/* Fetch user details in from 'user' table */
/* Query: none */

const fetchUser = (user, q, res) => {
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

  /* Start point */
  model.User.where({id: userId}).fetch({withRelated: ["userProjects", "transactions"]})
  .then((user) => {
    user = user.toJSON();

    /* userProject counts */
    const projectCountData = {
      success: 0,
      fail: 0,
      ongoing: 0,
      waiting: 0,
      total: 0
    };

    const today = new Date(new Date().toJSON().slice(0, 10));
    user.userProjects.forEach((project) => {
      projectCountData.total++;
      if (project.success) {
        projectCountData.success++;
      } else {
        const startAt = new Date(project.startAt);
        let diff = today.valueOf() - startAt.valueOf();
        diff = Math.ceil(diff / (60 * 60 * 24 * 1000));
        console.log("diff is ", diff);
        if (diff > 0 && diff <= 7) {
          projectCountData.ongoing++;
        } else if (diff > 7) {
          projectCountData.fail++;
        } else {
          projectCountData.waiting++;
        }
      }
    });
    user.userProjects = projectCountData;

    /* userPhoto */
    user.userPhoto = user.photo;
    delete user.photo;

    /* password -> delete */
    delete user.password;

    /* Transaction data */
    const transactionData = [];
    /* Array of Promises to be 'Promise.all'ed */
    const transactionPromiseArray = [];

    // user.transaction = transactionData;
    user.transactions.sort((a, b) => {
      let aSec = new Date(a.paymentDue).valueOf();
      let bSec = new Date(b.paymentDue).valueOf();
      return bSec - aSec;
    });

    user.transactions.forEach((trans) => {
      /* Each transaction datum is storedin transData and pushed to 'transactionData' */
      const transData = {};
      const dueDate = new Date(trans.paymentDue);
      /* diff is the difference between today and the payment due date */
      const diff = dueDate.valueOf() - today.valueOf();
      if (diff < 0) {
        const transPromise = new Promise((resolve, reject) => {
          transData.date = dueDate.toJSON().slice(0, 10);
          transData.amount = trans.amount;
          transData.status = "paid";
          transData.currency = trans.currency;
          transData.projectTitle = undefined;
          transData.id = trans.id;
          console.log("transdata is ", transData);
          
          /* project title */
          /* Fetch userProject details from 'userProject' table */
          model.UserProject.where("id", trans.userProjectId).fetch({withRelated: ["project"]})
          .then((userProject) => {
            userProject = userProject.toJSON();
            transData.projectTitle = userProject.project.title;
            if (userProject.success) {
              transData.status = "refunded";
            }
            transactionData.push(transData);
            resolve();
          })
          .catch((err) => {
            console.error("Error: Failed to read userProject data in 'fetchUser.js': ", err);
            resolve();
          });
        });
        transactionPromiseArray.push(transPromise);
      }
    });

    return Promise.all(transactionPromiseArray)
    .then(() => {
      user.transactions = transactionData;
      return user;
    });
  })
  .then((data) => res.status(200).send(data))
  .catch((err) => {
    console.error("Error: Failed to read user profile in 'fetchUser.js': ",err);
  });
};

export default fetchUser;
