import db from "../config/setConfig";
import Post from "./post";

const PostImage = db.Model.extend({
  tableName: "postImage",
  hasTimestamps: true,
  post: () => this.belongsTo(Post, "postId")
});

export default PostImage;
