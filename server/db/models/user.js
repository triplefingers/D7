import db from "../config/setConfig";
import bcrypt from "bcryptjs";

import Project from "./project";
import UserProject from "./userProject";
import Post from "./post";
import Wish from "./wish";
import Like from "./like";
import Report from "./report";
import Transaction from "./transaction";

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
  projects: () => this.hasMany(Project, "userId"),
  userProjects: () => this.hasMany(UserProject, "userId"),
  posts: () => this.hasMany(Post, "userId"),
  wishes: () => this.hasMany(Wish, "userId"),
  likes: () => this.hasMany(Like, "userId"),
  reports: () => this.hasMany(Report, "userId"),
  transactions: () => this.hasMany(Transaction, "userId"),
});

export default User;
