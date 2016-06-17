import db from 'config';

export default function resetDB ()=>{
  db.knex.schema.dropTableIfExists("Users");
  db.knex.schema.dropTableIfExists("Projects");
  db.knex.schema.dropTableIfExists("UserProjects");
  db.knex.schema.dropTableIfExists("Posts");
};
