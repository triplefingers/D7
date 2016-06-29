import model from "../db/models";
import collection from "../db/collections";
import Promise from "bluebird";

const fetchUser = (user, q, res) => {
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


  model.User.where({id: userId}).fetch({withRelated: ["userProjects", "transactions"]})
  .then((user) => {
    user = user.toJSON();
    console.log("Now fetching... userProfile is", user);

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

    /* Transaction data */
    const transactionData = [];
    const transactionPromiseArray = [];

    // user.transaction = transactionData;
    user.transactions.sort((a, b) => {
      let aSec = new Date(a.paymentDue).valueOf();
      let bSec = new Date(b.paymentDue).valueOf();
      return bSec - aSec;
    });


    user.transactions.forEach((trans) => {
      const transData = {};
      const dueDate = new Date(trans.paymentDue);
      const diff = dueDate.valueOf() - today.valueOf();
      if (diff < 0) {
        const transPromise = new Promise((resolve, reject) => {
          transData.date = dueDate.toJSON().slice(0, 10);
          transData.amount = trans.amount;
          transData.status = "paid";
          transData.currency = trans.currency;
          transData.projectTitle = undefined;
          console.log("transdata is ", transData);
          /* project title */
          model.UserProject.where("id", trans.userProjectId).fetch({withRelated: ["project"]})
          .then((userProject) => {
            userProject = userProject.toJSON();
            console.log("----------now fetching", userProject);
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
          })
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
  })
};

export default fetchUser;
