import db from "../config/setConfig";

import UserProject from "./userProject";

const User = db.Model.extend({
  tableName: "user",
  hasTimestamps: true,
  projects: ()=>this.hasMany(UserProject, "userId"),
});

export default User;
