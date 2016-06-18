import db from "../config/setConfig";

import UserProject from "./userProject";

const Post = db.Model.extend({
  tableName: "post",
  hasTimestamps: true,
  userProject : ()=>this.belongsTo(UserProject, "userProjectId"),
});

export default Post;
