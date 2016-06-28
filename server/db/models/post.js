import db from "../config/setConfig";
import User from "./user";
import UserProject from "./userProject";
import PostImage from "./postImage";
import Like from "./like";
import Report from "./report";

const Post = db.Model.extend({
  tableName: "post",
  hasTimestamps: true,
  defaults: {
    likeCount: 0
  },
  user: function () {
    return this.belongsTo(User, "userId");
  },
  userProject: function () {
    return this.belongsTo(UserProject, "userProjectId");
  },
  postImages: function () {
    return this.hasMany(PostImage, "postId");
  },
  likes: function () {
    return this.hasMany(Like, "postId");
  },
  reports: function () {
    return this.hasMany(Report, "postId");
  },
});

export default Post;
