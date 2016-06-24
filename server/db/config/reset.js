/* Defines DB Schema */

import db from "./setConfig";

const resetDB = () => {
  db.knex.schema

  .dropTableIfExists("user")
  .dropTableIfExists("project")
  .dropTableIfExists("userProject")
  .dropTableIfExists("post")
  .dropTableIfExists("postImage")

  // User Table
  .createTableIfNotExists("user", (user) => {
    user.increments("id").primary();
    user.string("email").unique().index();
    user.string("password");
    user.string("username");
    user.timestamps();
    console.log("created table user");
  })

  // Project Table
  .createTableIfNotExists("project", (project) => {
    project.increments("id").primary();
    project.string("title");
    project.string("description");
    project.integer("wish");
    project.timestamps();
    console.log("created table project");
  })

  // UserProject Table
  .createTableIfNotExists("userProject", (userProject) => {
    userProject.increments("id").primary();
    userProject.integer("userId").references("id").inTable("user");
    userProject.integer("projectId").references("id").inTable("project");
    userProject.date("startAt");
    userProject.date("endAt");
    userProject.timestamps();
    console.log("created table userProject");
  })

  // Post Table
  .createTableIfNotExists("post", (post) => {
    post.increments("id").primary();
    post.integer("userProjectId").references("id").inTable("userProject");
    post.integer("day");
    post.text("text");
    post.timestamps();
    console.log("created table post");
  })

  // PostImage Table
  .createTableIfNotExists("postImage", (postImage) => {
    postImage.increments("id").primary();
    postImage.integer("postId").references("id").inTable("post");
    postImage.integer("index");
    postImage.text("url");
    postImage.timestamps();
    console.log("created table postImage");
  }).then(() => console.log("DB reset complete"));
};

export default resetDB;
