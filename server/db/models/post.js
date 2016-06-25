import db from "../config/setConfig";
import User from "./user";
import UserProject from "./userProject";
import PostImage from "./postImage";
import Like from "./like";
import report from "./report";

const Post = db.Model.extend({
  tableName: "post",
  hasTimestamps: true,
  defaults: {
    likeCount: 0
  },
  user: () => this.belongsTo(User, "userId"),
  userProject : () => this.belongsTo(UserProject, "userProjectId"),
  postImages: () => this.hasMany(PostImage, "postId"),
  likes: () => this.hasMany(Like, "postId"),
  reports: () => this.hasMany(Report, "postId"),
});

export default Post;
