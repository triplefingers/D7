import db from "../config/setConfig";
import model from "../models";

const Reports = new db.Collection();

Reports.model = model.Report;

export default Reports;
