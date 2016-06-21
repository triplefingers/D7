import db from "../config/setConfig";
import model from "../models";

const PostImages = new db.Collection();

PostImages.model = model.PostImage;

export default PostImages;
