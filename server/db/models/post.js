import db from "../config/setConfig";
import UserProject from "./userProject";
import PostImage from "./postImage";

const Post = db.Model.extend({
  tableName: "post",
  hasTimestamps: true,
  userProject : ()=>this.belongsTo(UserProject, "userProjectId"),
  postImage: function() {
    return this.hasMany(PostImage, "postId");
  }
});

export default Post;
