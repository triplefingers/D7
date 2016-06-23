import express from "express";
const router = express.Router();

/* dummy data 가져오기 */
import dummy from "./db/temp";

/* api Handler Methods 가져오기 */
import api from "./api";
var {handler, fetchAllProjects, fetchOngoingProjects, fetchRecommendedProjects, fetchProjectDetail, createNewProject, record} = api;

/* Passport import */
import passport from "passport";
import LocalStrategy from "passport-local";
import model from "./db/models";
import bcrypt from "bcrypt";

/* Passport local setting */
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  model.User.forge().get(id).fetch({require: true})
  .then((user)=> done(err, user.toJSON()));
})
passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
}, (email, password, done) => {
    model.User.forge()
    .where({email: email})
    .fetch({require: true})
    .then((user) => {
      console.log('USER', user);
      user = user.toJSON();
      if(bcrypt.compareSync(password, user.password)){
        done(null, user)
      } else {
        done(null, false, { message: "Incorrect password."})
      }
    }).catch((err) => {
      done(null, false, { message: "Incorrect username" })
    });
  })
);

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
        return res.status(401).json({ message: info.message });
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



router.get("/api/projects/all", handler(fetchAllProjects));
router.get("/api/projects/ongoing", handler(fetchOngoingProjects));
router.get("/api/projects/recommended", handler(fetchRecommendedProjects));
router.get("/api/project", handler(fetchProjectDetail));

router.post("/api/record", handler(record));
router.post("/api/newproject", handler(createNewProject));

router.get("*", (req, res, next) => {
  res.send(404, "404 - uhehehe");
});

module.exports = router;
