import express from "express";
const router = express.Router();

/* dummy data 가져오기 */
import dummy from "./db/temp";

/* api Handler Methods 가져오기 */
import api from "./api";
var {handler, fetchAllProjects, fetchOngoingProjects, fetchRecommendedProjects, fetchProjectDetail, createNewProject, record} = api;

/* Authentication checking middleware */
const isAuthenticated = (req, res, next) => {
  if (req.user){
    console.log(">>>>>>>>>>>>",req.user);
    return next();
  } else {
    // res.redirect("/");
    res.status(401).json({path: "/"});
  }
};

/* Passport import */
import passport from "passport";
import LocalStrategy from "passport-local";
import model from "./db/models";
import bcrypt from "bcryptjs";

import localSetup from './helpers/passport_setup/local';

/* Passport local setting */
localSetup();

/* Passport Facebook setting */
// some code

/* Passport Google setting */
// some code

/* Passport route */
router.post("/api/signup", function (req, res, next){
  new model.User({email: req.body.email, password: req.body.password, username: req.body.username}).save()
  .then((user) => {
    console.log(user);
    req.login(user, (err)=>{
      if(!err){
        return res.status(200).json({ message: "You have been successfully signed in." });;
      } else {
        return res.status(401).json({ message: "You have been successfully signed up but there is something wrong logging in. Please try login again." });
      }
    });
  })
  .catch((err) => {
    return res.status(401).json({ message: "This email is already registered. Please try another email." });
  });
});

router.post("/api/login", function (req, res, next){
  passport.authenticate(
    "local",
    (authErr, user, info) => {
      if (authErr) {
        console.log(authErr);
        return next(authErr);
      }
      if (!user) {
        return res.status(401).json({ message: "There is no user matches" });
      }
      return req.logIn(user, (loginErr) => {
        if (loginErr) {
          return res.status(401).json({ message: loginErr });
        } else {
          return res.status(200).json({
            message: "You have been successfully logged in."
          });
        }
      });
    })(req, res, next);
});

router.get("/api/logout", function (req, res){
  req.logout();
  return res.status(200).json({
    message: "You have been successfully logged out."
  });
});

router.get("/api/checklogin", function (req, res) {
  if (req.user) {
    res.status(200).send();
  } else {
    res.status(401).send();
  }
});

router.get("/api/projects/all", isAuthenticated, handler(fetchAllProjects));
router.get("/api/projects/ongoing", isAuthenticated, handler(fetchOngoingProjects));
router.get("/api/projects/recommended", isAuthenticated, handler(fetchRecommendedProjects));
router.get("/api/project", isAuthenticated, handler(fetchProjectDetail));

router.post("/api/record", isAuthenticated, handler(record));
router.post("/api/newproject", isAuthenticated, handler(createNewProject));

router.get("*", (req, res, next) => {
  res.redirect("/");
});

module.exports = router;
