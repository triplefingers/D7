import db from "../config/setConfig";
import User from "./user";
import Post from "./post";

const Report = db.Model.extend({
  tableName: "report",
  hasTimestamps: true,
  user : () => this.belongsTo(User, "userId"),
  post : () => this.belongsTo(Post, "postId"),
});

export default Report;
