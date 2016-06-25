import db from "../config/setConfig";
import Post from "./post";
import User from "./user";
import Project from "./project";
import Transaction from "./transaction";

const UserProject = db.Model.extend({
  tableName: "userProject",
  hasTimestamps: true,
  defaults: {
    success: false
  },
  user: function () {
    return this.belongsTo(User, "userId");
  },
  project: function () {
    return this.belongsTo(Project, "projectId");
  },
  posts: function () {
    return this.hasMany(Post, "userProjectId");
  },
  transactions: function () {
    return this.hasMany(Transaction, "userProjectId");
  },
});

export default UserProject;
