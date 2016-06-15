import db from '../config';
import Project from '../models/project';

const Projects = new db.Collection();

Projects.model = Project;

export default Projects;
