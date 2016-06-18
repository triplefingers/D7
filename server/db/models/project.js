import db from "../config/setConfig";

const Project = db.Model.extend({
  tableName: "project",
  hasTimestamps: true,
  defaults: {
    wish: 0,
  },
});

export default Project;
