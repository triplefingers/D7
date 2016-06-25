import db from "../config/setConfig";
import User from "./user";
import Post from "./post";

const Report = db.Model.extend({
  tableName: "report",
  hasTimestamps: true,
  user: function () {
    return this.belongsTo(User, "userId");
  },
  post: function () {
    return this.belongsTo(Post, "postId");
  },
});

export default Report;
