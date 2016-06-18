import db from "../config/setConfig";
import Post from "./post";
import User from "./user";
import Project from "./project";

const UserProject = db.Model.extend({
  tableName: "userProject",
  hasTimestamps: true,
  posts: ()=>this.hasMany(Post, "userProjectId"),
  user: ()=>this.belongsTo(User, "userId"),
  project: function(){
    return this.belongsTo(Project, "projectId");
  }
});

export default UserProject;
