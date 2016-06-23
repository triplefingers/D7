import model from "../db/models";
import collection from "../db/collections";

const record = (url, q, body, res)=>{
  var { id, onDay, text } = body;
  model.Post.forge().set({
    userProjectId: id,
    day: onDay,
    text: text
  }).save().then((post)=>{
    return post;
  }).then((data)=>res.status(200).send(data));
};

export default record;
