import db from "../config/setConfig";
import model from "../models";

const UserProjects = new db.Collection();

UserProjects.model = model.UserProject;

export default UserProjects;
