import db from "../config/setConfig";
import model from "../models";

const Users = new db.Collection();

Users.model = model.User;

export default Users;
