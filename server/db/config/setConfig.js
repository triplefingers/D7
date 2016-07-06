import path from "path";
import knex from "knex";
import bookshelf from "bookshelf";

const db = bookshelf(
  knex(
    {
      client: "sqlite3",
      connection: {
        filename: path.join(__dirname, "d7.sqlite"),
      },
      useNullAsDefault: true
    }
  )
);

/* Inject plugin into bookshelf */
db.plugin("pagination");

export default db;
