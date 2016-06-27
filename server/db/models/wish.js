import db from "../config/setConfig";
import User from "./user";
import Project from "./project";

const Wish = db.Model.extend({
  tableName: "Wish",
  hasTimestamps: true,
  user : function () {
    return this.belongsTo(User, "userId");
  },
  project : function () {
    return this.belongsTo(Project, "postId");
  },
});

export default Wish;
