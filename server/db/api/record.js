import model from "../models";
import collection from "../collections";
import db from "../config/setConfig";

const record = (url, q, body, res)=>{
  var { id, onDay, text, publicIds } = body;
  publicIds = JSON.parse(publicIds).map((publicId, index) => {
    return {index: index, url: publicId};
  })

  console.log("---------------", publicIds);
  model.Post.forge().set({
    userProjectId: id,
    day: onDay,
    text: text
  }).save()
  .then((post)=>{
    publicIds.forEach((publicId) => {
      publicId["postId"] = post.id;
    });

    return db.knex.insert(publicIds).into("postImage")
      .then(() => {
        console.log("post is ", post);
        return post;
      })
      .catch((err) => console.error("Error: cannot save postImages in db"));
  })
  .then((data) => res.status(200).send(data))
  .catch((err) => console.error("Error: cannot save dayDetail in db"));
};

export default record;
