import db from "../config/setConfig";
import User from "./user";
import Project from "./project";

const Wish = db.Model.extend({
  tableName: "like",
  hasTimestamps: true,
  user : () => this.belongsTo(User, "userId"),
  project : () => this.belongsTo(Project, "postId"),
});

export default Wish;
