import db from "./setConfig";

const createTables = () => {
  db.knex.schema.createTableIfNotExists("user", function(user){
    user.increments("id").primary();
    user.string("username");
    user.string("email");
    user.timestamps();
    console.log("created table user");
  }).createTableIfNotExists("project", function(project){
    project.increments("id").primary();
    project.string("title");
    project.string("description");
    project.integer("wish");
    project.timestamps();
    console.log("created table project");
  }).createTableIfNotExists("userProject", function(userProject){
    userProject.increments("id").primary();
    userProject.integer("userId").references("id").inTable("user");
    userProject.integer("projectId").references("id").inTable("project");
    userProject.date("startAt");
    userProject.date("endAt");
    userProject.timestamps();
    console.log("created table userProject");
  }).createTableIfNotExists("post", function(post){
    post.increments("id").primary();
    post.integer("userProjectId").references("id").inTable("userProject");
    post.integer("day");
    post.text("text");
    post.timestamps();
    console.log("created table post");
  }).createTableIfNotExists("postImage", function(postImage){
    post.increments("id").primary();
    post.integer("postId").references("id").inTable("post");
    post.text("url");
    post.timestamps();
    console.log("created table postImage");
  });
};

export default createTables;
