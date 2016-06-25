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
  user: () => this.belongsTo(User, "userId"),
  project: () =>this.belongsTo(Project, "projectId"),
  posts: () => this.hasMany(Post, "userProjectId"),
  transactions: () => this.hasMany(Transaction, "userProjectId"),
});

export default UserProject;
