import express from "express";

/* dummy data 가져오기 */
import dummy from "./db/temp";

const router = express.Router();

router.get("/api/user", (req, res, next) => {
  let url = req.path;
  let query = req.query;
  console.log("QUERY", query);
  console.log("URL", url);
  res.send(200, dummy.user);
});

router.get("/api/projects", (req, res, next) => {
  let url = req.path;
  let query = req.query;
  console.log("QUERY", query);
  console.log("URL", url);
  if (query.type === "all"){
    res.send(200, dummy.all);
  } else if (query.type === "ongoing"){
    res.send(200, dummy.all.ongoing);
  } else if (query.type === "recommended"){
    res.send(200, dummy.recommended);
  } else {
    res.send(404, "404 - Bad request");
  }
});

router.get("/api/project", (req, res, next) => {
  let url = req.url;
  let query = req.query;
  console.log("QUERY", query);
  console.log("URL", url);
  res.send(200, dummy.project);
});

router.post("/api/record", (req, res, next) => {
  let url = req.url;
  let body = req.body;
  console.log("BODY", body);
  console.log("URL", url);
  res.send(200, "data response for recording today");
});

router.post("/api/newproject", (req, res, next) => {
  let url = req.url;
  let body = req.body;
  console.log("BODY", body);
  console.log("URL", url);
  res.send(200, {id: 100, title: body.title, description: body.description, onDay: 1, msg: "data response for creating new project"});
});

router.get("*", (req, res, next) => {
  res.send(404, "404 - uhehehe");
});

module.exports = router;
