import model from "../models";
import collection from "../collections";
import Promise from "bluebird";

const fetchProjectDetail = (url, q, res)=>{
  var { id } = q;
  model.Post.where("userProjectId", id).fetchAll({withRelated: ["postImage"]})
  .then((posts) => {
    posts = posts.toJSON();
    posts.forEach((post) => {
      console.log("----------post is --------", post);
      let postImages = post.postImage;
      let newPostImages = [];
      console.log("-----------postImages are", postImages);
      postImages.forEach((postImage) => {
        newPostImages[postImage.index] = postImage.url;
      });
      console.log("----------newPostImages are-----", newPostImages);
      post.publicIds = newPostImages;
      delete post.postImage;
    });
    return posts;
  })
  .then((data) => res.status(200).send(data))
  .catch((err) => console.log("Error: Cannot read projectDetails from db", err));
};

export default fetchProjectDetail;
