import db from "../config/setConfig";
import { Post } from "../models";

const Posts = new db.Collection();

Posts.model = Post;

export default Posts;
