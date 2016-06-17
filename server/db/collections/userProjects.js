import db from "../config/setConfig";
import { UserProject } from "../models";

const UserProjects = new db.Collection();

UserProjects.model = UserProject;

export default UserProjects;
