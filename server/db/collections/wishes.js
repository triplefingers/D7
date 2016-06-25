import db from "../config/setConfig";
import model from "../models";

const Wishes = new db.Collection();

Wishes.model = model.Wish;

export default Wishes;
