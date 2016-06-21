import express from "express";

/* dummy data 가져오기 */
import dummy from "./db/temp";

/* api Handler Methods 가져오기 */
import api from "./api";
var {handler, fetchAllProjects, fetchOngoingProjects, fetchRecommendedProjects, fetchProjectDetail, createNewProject, record} = api;

const router = express.Router();

router.get("/api/user", (req, res, next) => {
  let url = req.path;
  let query = req.query;
  console.log("QUERY", query);
  console.log("URL", url);
  res.send(200, dummy.user);
});

router.get("/api/projects/all", handler(fetchAllProjects));
router.get("/api/projects/ongoing", handler(fetchOngoingProjects));
router.get("/api/projects/recommended", handler(fetchRecommendedProjects));

router.get("/api/project", handler(fetchProjectDetail));

// router.post("/api/record", (req, res, next) => {
//   let url = req.url;
//   let body = req.body;
//   console.log("BODY", body);
//   console.log("URL", url);
//   res.send(200, "data response for recording today");
// });

router.post("/api/record", handler(record));

// router.post("/api/newproject", (req, res, next) => {
//   let url = req.url;
//   let body = req.body;
//   console.log("BODY", body);
//   console.log("URL", url);
//   res.send(200, {id: 100, title: body.title, description: body.description, onDay: 1, msg: "data response for creating new project"});
// });

router.post("/api/newproject", handler(createNewProject));

router.get("*", (req, res, next) => {
  res.send(404, "404 - uhehehe");
});

module.exports = router;
