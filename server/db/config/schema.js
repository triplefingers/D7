import db from 'config';

const createTables = ()=>{
  db.knex.schema.hasTable("Users").then(function(exists){
    if(!exists){
      db.knex.schema.createTable("Users", function(user){
        user.increments("id").primary();
        user.string("username");
        user.string("email");
        user.timestamps();
      }).then(function(table){
        console.log("Created Table", table);
      })
    }
  });

  db.knex.schema.hasTable("Projects").then(function(exists){
    if(!exists){
      db.knex.schema.createTable("Projects", function(project){
        project.increments("id").primary();
        project.string("title");
        project.string("description");
        project.integer("wish").index("wish");
        project.timestamps();
      }).then(function(table){
        console.log("Created Table", table);
      })
    }
  });

  db.knex.schema.hasTable("UserProjects").then(function(exists){
    if(!exists){
      db.knex.schema.createTable("UserProjects", function(project){
        project.increments("id").primary();
        project.integer("userId").references("id").inTable("Users");
        project.integer("projectId").references("id").inTable("Projects");
        project.date("startAt");
        project.date("endAt");
        project.timestamps();
      }).then(function(table){
        console.log("Created Table", table);
      })
    }
  });

  db.knex.schema.hasTable("Posts").then(function(exists){
    if(!exists){
      db.knex.schema.createTable("Posts", function(post){
        post.increments("id").primary();
        post.integer("userProjectId").references("id").inTable("UserProjects");
        post.integer("day");
        post.text("text");
        post.timestamps();
      })
    }
  });
};

export default createTables;
