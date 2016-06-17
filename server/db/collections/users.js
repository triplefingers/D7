import db from "../config/setConfig";
import { User } from "../models";

const Users = new db.Collection();

Users.model = User;

export default Users;
