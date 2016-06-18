import db from "../config/setConfig";
import model from "../models";

const Posts = new db.Collection();

Posts.model = model.Post;

export default Posts;
