import model from "../db/models";
import collection from "../db/collections";
import db from "../db/config/setConfig";

const record = (url, q, body, res)=>{
  var { id, onDay, text, publicIds } = body;
  publicIds = JSON.parse(publicIds).map((publicId, index) => {
    return {index: index, url: publicId};
  });

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
      .catch((err) => console.error("Error: Failed to store postImages in db in 'record.js': ", err));
  })
  .then((data) => res.status(200).send(data))
  .catch((err) => {
    console.error("Error: Failed to store dayDetail in db in 'record.js': ", err);
    res.status(500).end();
  });
};

export default record;
