import model from "../db/models";
import collection from "../db/collections";
import db from "../db/config/setConfig";

const record = (user, q, body, res) => {
  var userId = user.id;
  var { id, onDay, text, publicIds } = body;
  publicIds = JSON.parse(publicIds).map((publicId, index) => {
    return {index: index, url: publicId};
  });

  model.Post.forge().set({
    userId: userId,
    userProjectId: id,
    day: onDay,
    text: text
  }).save()
  .then((post)=>{
    publicIds.forEach((publicId) => {
      publicId["postId"] = post.id;
    });
    console.log("----------------post is 000", publicIds);
    /* check if the length of publicIds array is 0 */
    /* if 0, do not execute knex.insert, or it will print out error like below */
    /* { Error:  - SQLITE_MISUSE: not an error at Error (native) errno: 21, code: 'SQLITE_MISUSE' } */
    if (publicIds.length < 1) {
      return post;
    } else {
      return db.knex.insert(publicIds).into("postImage")
        .then(() => {
          console.log("--------------post is ", post);
          return post;
        })
        .catch((err) => console.error("Error: Failed to store postImages in db in 'record.js': ", err));
    }
  })
  .then((post) => {
    console.log("----------post here is 111", post);
    post = post.toJSON();
    return model.UserProject.where({id: post.userProjectId}).fetch()
    .then((userProject) => {
      userProject = userProject.toJSON();
      let postDate = new Date(post.created_at).toJSON().slice(0, 10);
      let endDate = userProject.endAt;
      console.log("postdate and enddate", postDate, endDate);
      /* check if the date of posting is same with endDate of the userProject */
      /* and if so, update success col of userProject, from false to true */
      if (postDate === endDate) {
        console.log("successssssssssssssssssss---------------");
        return new model.UserProject({id: post.userProjectId}).save({success: true})
        .then(() => post)
        .catch((err) => console.error("Error: Failed to change userProject S/U status in 'record.js': ", err));
      } else {
        return post;
      }
    });
  })
  .then((data) => {
    console.log("-----success dealt data is ", data);
    res.status(200).send(data);
  })
  .catch((err) => {
    console.error("Error: Failed to store dayDetail in db in 'record.js': ", err);
    res.status(500).end();
  });
};

export default record;
