import db from "../config/setConfig";
import model from "../models";

const Projects = new db.Collection();

Projects.model = model.Project;

export default Projects;
