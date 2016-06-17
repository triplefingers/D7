import path from "path";
import knex from "knex";
import bookshelf from "bookshelf";

const db = bookshelf(knex({
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "d7.sqlite"),
    database: "d7",
    // timezone: "KST",
    // charset: "utf8"
  },
  useNullAsDefault: true
}));

export default db;
