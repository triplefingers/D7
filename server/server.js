/* Get tools we need */
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import router from "./router";

import cookieParser from "cookie-parser";
import passport from "passport";
import flash from "connect-flash";
import session from "express-session";

const app = express();
let port = process.env.PORT || 8080;

/* Set up express application */
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/../client"));

/* Set up Passport */
app.use(session({secret: "iloved7olived7iloved7"}));
app.use(passport.Initialize());
app.use(passport.session());
app.use(flash());

/* Routes */
app.use("/", router);
console.log("Applied router middleware");

/* Initialize Database */
import config from "./db/config";
config.resetDB()
.then(config.initDB());

/* Launch Server */
const server = app.listen(port, () => {
  console.log("Express listening on port", port);
});
