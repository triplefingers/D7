import db from "../config/setConfig";
console.log("db in project.js", db);

const Project = db.Model.extend({
  tableName: "Projects",
  hasTimestamps: true,
  defaults: {
    wish: 0,
  },
})

export default Project;
