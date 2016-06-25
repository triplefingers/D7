import db from "../config/setConfig";
import model from "../models";

const Likes = new db.Collection();

Likes.model = model.Like;

export default Likes;
