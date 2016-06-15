import db from '../config';
import UserProject from '../models/userProject';

const UserProjects = new db.Collection();

UserProjects.model = UserProject;

export default UserProjects;
