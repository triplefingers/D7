import express from "express";
const router = express.Router();

/* dummy data 가져오기 */
import dummy from "./db/temp";


/* api Handler Methods 가져오기 */
import api from "./api";
var {handler, fetchUser, fetchAllProjects, fetchOngoingProjects, fetchRecommendedProjects, fetchWishProjects, fetchProjectDetail, fetchRecentPosts, fetchPopularPosts, fetchPostDetail, createNewProject, record, like, report} = api;


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


/* Passport Strategies */
import localSetup from './helpers/passport_setup/local';


/* Passport local setting */
localSetup();


/* Passport Facebook setting */
// some code


/* Passport Google setting */
// some code


/* Passport Authentication APIs */
import login from "./api/auth/login";
import signup from "./api/auth/signup";
import logout from "./api/auth/logout";
import checkLogin from "./api/auth/checkLogin";

router.post("/api/signup", signup());
router.post("/api/login", login());
router.get("/api/logout", isAuthenticated, logout());
router.get("/api/checklogin", checkLogin());


/* Data save/fetch APIs */
router.get("/api/user", /* needs isAuthenticated*/handler(fetchUser));
router.get("/api/posts/popular", /* needs isAuthenticated*/handler(fetchPopularPosts));
router.get("/api/posts/recent", /* needs isAuthenticated*/handler(fetchRecentPosts));
router.get("/api/post", /* needs isAuthenticated*/handler(fetchPostDetail));
router.get("/api/projects/all", /* needs isAuthenticated*/handler(fetchAllProjects));
router.get("/api/projects/ongoing", /* needs isAuthenticated*/handler(fetchOngoingProjects));
router.get("/api/projects/recommended", /* needs isAuthenticated*/handler(fetchRecommendedProjects));
router.get("/api/projects/wish", /* needs isAuthenticated*/handler(fetchWishProjects));
router.get("/api/project", /* needs isAuthenticated*/handler(fetchProjectDetail));

router.post("/api/record", isAuthenticated, handler(record));
router.post("/api/newproject", isAuthenticated, handler(createNewProject));
router.post("/api/like", /* needs isAuthenticated*/handler(like));
router.post("/api/report", /* needs isAuthenticated*/handler(report));

router.get("*", (req, res, next) => {
  res.redirect("/");
});

export default router;
