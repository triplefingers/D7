import db from "./setConfig";

const resetDB = ()=>{
  db.knex.schema.dropTableIfExists("Users");
  db.knex.schema.dropTableIfExists("Projects");
  db.knex.schema.dropTableIfExists("UserProjects");
  db.knex.schema.dropTableIfExists("Posts");
  console.log("Reset DB");
};

export default resetDB;
