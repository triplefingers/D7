import db from "../config/setConfig";
import User from "./user";
import UserProject from "./userProject";
import Wish from "./wish";

const Project = db.Model.extend({
  tableName: "project",
  hasTimestamps: true,
  defaults: {
    wishCount: 0,
  },
  user: () => this.belongsTo(User, "userId"),
  userProjects: () => this.hasMany(UserProject, "projectId"),
  wishes: () => this.hasMany(Wish, "projectId"),
});

export default Project;
