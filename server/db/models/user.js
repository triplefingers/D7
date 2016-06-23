import db from "../config/setConfig";
import bcrypt from "bcryptjs";

import UserProject from "./userProject";

const User = db.Model.extend({
  tableName: "user",
  hasTimestamps: true,
  initialize: function(){
    this.on("created", this.hashPW, this);
  },
  hashPW: function(model, attrs, options){
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(model.attributes.password, salt);
    model.set("password", hash).save();
  },
  projects: () => this.hasMany(UserProject, "userId"),
});

export default User;
