import db from "../config/setConfig";
console.log("db in userProject.js", db);
import Post from "./post";
import User from "./user";
import Project from "./project";


const UserProject = db.Model.extend({
  tableName: "UserProjects",
  hasTimestamps: true,
  posts: ()=>this.hasMany(Post, "userProjectId"),
  user: ()=>this.belongsTo(User, "userId"),
  project: ()=>this.belongsTo(Project, "projectId"),
})

export default UserProject;
