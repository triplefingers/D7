import db from '../config';
import User from '../models/user';

const Users = new db.Collection();

Users.model = User;

export default Users;
