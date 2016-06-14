import path from 'path';
import knex from 'knex';
import bookshelf from 'bookshelf';

const db = bookshelf(knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, 'd7.sqlite')
  }
}));

db.knex.schema.hasTable('Users').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('Users', function(user){
      user.increments('id').primary();
      user.string('username', 255);
      user.string('email', 255);
      user.timestamps();
    }).then(function(table){
      console.log('Created Table', table);
    })
  }
});

db.knex.schema.hasTable('Projects').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('Projects', function(project){
      project.increments('id').primary();
      project.string('title', 255);
      project.string('description', 255);
      project.integer('wish');
      project.timestamps();
    }).then(function(table){
      console.log('Created Table', table);
    })
  }
});

db.knex.schema.hasTable('UserProjects').then(function(exists){
  if(!exists){
    db.knex.schema.createTable('UserProjects', function(project){
      project.increments('id').primary();
      project.integer('userId').references('id').inTable('Users');
      project.integer('projectId').references('id').inTable('Projects');
      project.dateTime('startAt');
      project.dateTime('endAt');
      project.integer('wish');
      project.timestamps();
    }).then(function(table){
      console.log('Created Table', table);
    })
  }
});

export default db;
