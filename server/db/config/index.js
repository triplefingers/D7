import db from "./setConfig";
import initDB from "./init";
import resetDB from "./reset";
import Promise from "bluebird";

export default {
  db: db,
  initDB: Promise.promisify(initDB),
  resetDB: Promise.promisify(resetDB),
};
