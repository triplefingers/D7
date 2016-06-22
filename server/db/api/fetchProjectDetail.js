import model from "../models";
import collection from "../collections";
import Promise from "bluebird";

const fetchProjectDetail = (url, q, res)=>{
  var { id } = q;
  model.Post.where("userProjectId", id).fetchAll({withRelated: ["postImage"]})
  .then((posts) => {
    posts = posts.toJSON();
    posts.forEach((post) => {
      let postImages = post.postImage;
      let newPostImages = [];
      postImages.forEach((postImage) => {
        newPostImages[postImage.index] = postImage.url;
      });
      post.publicIds = newPostImages;
      delete post.postImage;
    });
    return posts;
  })
  .then((data) => res.status(200).send(data))
  .catch((err) => console.log("Error: Cannot read projectDetails from db in 'fetchProjectDetail.js'", err));
};

export default fetchProjectDetail;
