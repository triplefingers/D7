import path from "path";
import knex from "knex";
import bookshelf from "bookshelf";

const db = bookshelf(knex({
  client: "sqlite3",
  connection: {
    filename: path.join(__dirname, "d7.sqlite"),
  },
  useNullAsDefault: true
}));

/* inject plugin into bookshelf */
db.plugin("pagenation");

export default db;
