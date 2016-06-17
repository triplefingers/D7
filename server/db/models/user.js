import db from "../config/setConfig";
console.log("db in user.js", db);

import UserProject from "./userProject";

const User = db.Model.extend({
  tableName: "Users",
  hasTimestamps: true,
  projects: ()=>this.hasMany(UserProject, "userId"),
});

export default User;
