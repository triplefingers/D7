import db from "../config/setConfig";
import { Project } from '../models';

const Projects = new db.Collection();

Projects.model = Project;

export default Projects;
