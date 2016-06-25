import db from "../config/setConfig";
import User from "./user";
import Post from "./post";

const Like = db.Model.extend({
  tableName: "like",
  hasTimestamps: true,
  user : function () {
    return this.belongsTo(User, "userId");
  },
  post : function () {
    return this.belongsTo(Post, "postId");
  },
});

export default Like;
