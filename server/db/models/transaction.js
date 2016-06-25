import db from "../config/setConfig";
import User from "./user";
import UserProject from "./userProject";

const Transaction = db.Model.extend({
  tableName: "transaction",
  hasTimestamps: true,
  user : () => this.belongsTo(User, "userId"),
  userProject : () => this.belongsTo(UserProject, "userProjectId"),
  default: {
    currency: "won",
    success: true
  }
});

export default Transaction;
