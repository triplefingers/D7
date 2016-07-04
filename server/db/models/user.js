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
  defaults: {
    photo: "a6jnokqrjo9ptrsl1vgv"
  },
  projects: function () {
    return this.hasMany(Project, "userId");
  },
  userProjects: function () {
    return this.hasMany(UserProject, "userId");
  },
  posts: function () {
    return this.hasMany(Post, "userId");
  },
  wishes: function () {
    return this.hasMany(Wish, "userId");
  },
  likes: function () {
    return this.hasMany(Like, "userId");
  },
  reports: function () {
    return this.hasMany(Report, "userId");
  },
  transactions: function () {
    return this.hasMany(Transaction, "userId");
  },
});

export default User;
