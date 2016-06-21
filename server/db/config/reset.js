import db from "./setConfig";

const resetDB = ()=>{
  db.knex.schema.dropTableIfExists("user")
  .dropTableIfExists("project")
  .dropTableIfExists("userProject")
  .dropTableIfExists("post")
  .dropTableIfExists("postImage")
  .createTableIfNotExists("user", function(user){
    user.increments("id").primary();
    user.string("email");
    user.string("password");
    user.string("username");
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
    postImage.increments("id").primary();
    postImage.integer("postId").references("id").inTable("post");
    postImage.integer("index");
    postImage.text("url");
    postImage.timestamps();
    console.log("created table postImage");
  }).then(()=>console.log("reset DB"));
};

export default resetDB;
