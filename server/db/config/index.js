import db from "config";
import initDB from "init";
import resetDB from "reset";
import createTables from "schema";

export default {
  db: db,
  initDB: initDB,
  resetDB: resetDB,
  createTables: createTables
};
