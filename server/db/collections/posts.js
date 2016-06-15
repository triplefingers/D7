import db from '../config';
import Post from '../models/post';

const Posts = new db.Collection();

Posts.model = Post;

export default Posts;
