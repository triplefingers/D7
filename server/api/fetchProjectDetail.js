import model from "../db/models";
import collection from "../db/collections";

const fetchProjectDetail = (user, q, res)=>{
  var { id } = q;
  model.Post.where("userProjectId", id).fetchAll({withRelated: ["postImages"]})
  .then((posts) => {
    posts = posts.toJSON();
    posts.forEach((post) => {
      let postImages = post.postImages;
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
