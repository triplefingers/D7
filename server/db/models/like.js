import db from "../config/setConfig";
import User from "./user";
import Post from "./post";

const Like = db.Model.extend({
  tableName: "like",
  hasTimestamps: true,
  user : () => this.belongsTo(User, "userId"),
  post : () => this.belongsTo(Post, "postId"),
});

export default Like;
