import db from "../config/setConfig";
console.log("db in post.js", db);

import UserProject from "./userProject";

const Post = db.Model.extend({
  tableName: "Posts",
  hasTimestamps: true,
  userProject : ()=>this.belongsTo(UserProject, "userProjectId"),
});

export default Post;
