import db from "./setConfig";
import initDB from "./init";
import resetDB from "./reset";
import createTables from "./schema";
import Promise from "bluebird";

export default {
  db: db,
  initDB: Promise.promisify(initDB),
  resetDB: Promise.promisify(resetDB),
  // createTables: Promise.promisify(createTables)
};
