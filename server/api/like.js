import model from "../db/models";
import collection from "../db/collections";
import db from "../db/config/setConfig";

const like = (user, q, body, res) => {
  // const userId = user.id;
  const postId = body.postId;

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
      return model.Like.where({userId: userId, postId: postId}).fetch();
    } else {
      throw "Invalid postId";
    }
  })
  .then((like) => {
    console.log("like is ------------, ", like);
    if (like) {
      return new model.Like({id: like.id}).destroy();
    } else {
      return new model.Like({userId: userId, postId: postId}).save();
    }
  })
  .then((data) => {
    console.log("data is -------------,", data);
    res.status(200).send(data);
  })
  .catch((err) => {
    console.error("Error: Failed to store like info in Like Table in 'like.js': ", err);
    res.status(500).end();
  });

};

export default like;
