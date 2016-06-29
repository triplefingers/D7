import model from "../db/models";
import collection from "../db/collections";
import db from "../db/config/setConfig";

const report = (user, q, body, res) => {
  // const userId = user.id;
  const { postId, description } = body;

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

  model.Post.where("id", postId).fetch()
  .then((post) => {
    if (post) {
      return new model.Report({userId: userId, postId: postId, description: description}).save();
    } else {
      throw "Invalid postId";
    }
  })
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    console.error("Error: Failed to store like info in Report Table in 'report.js': ", err);
    res.status(500).end();
  });

};

export default report;
