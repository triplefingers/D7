import db from "../config/setConfig";
import model from "../models";

const Transactions = new db.Collection();

Transactions.model = model.Transaction;

export default Transactions;
