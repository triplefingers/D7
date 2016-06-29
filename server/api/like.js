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

  /* likeCount */
  let likeCount = 0;

  model.Post.where("id", postId).fetch()
  .then((post) => {
    if (post) {
      post = post.toJSON();
      likeCount = post.likeCount;
      console.log("----------likeCount is ", likeCount);
      return model.Like.where({userId: userId, postId: postId}).fetch();
    } else {
      throw "Invalid postId";
    }
  })
  .then((like) => {
    if (like) {
      likeCount -= 1;
      return new model.Like({id: like.id}).destroy()
      .catch((err) => "Failed to destroy like table row: " + err);
    } else {
      likeCount += 1;
      return new model.Like({userId: userId, postId: postId}).save()
      .catch((err) => "Failed to add new like row: " + err);
    }
  })
  .then(() => {
    new model.Post({id: postId}).save({likeCount: likeCount});
  })
  .then(() => {
    return {postId: postId, likeCount: likeCount};
  })
  .then((data) => {
    res.status(200).send(data);
  })
  .catch((err) => {
    console.error("Error: Failed to store like info in Like Table in 'like.js': ", err);
    res.status(500).end();
  });
};

export default like;
