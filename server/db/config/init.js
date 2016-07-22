/* Inserts Dummy Data into DB */

import model from "../models";
import InitialData from "./helpers/InitialData";

const initDB = () => {

  /* Create User model data */
  new model.User(
    { username: "Lenny Kim",
      email: "idforcoding@gmail.com",
      password: "12345678"
    }).save().then((model) => console.log("Created User model: ", model.attributes.username));

  /* Create Project model data */
  InitialData.ProjectData.forEach((item) => {
    new model.Project(item).save()
    .then((model) => console.log("Created Project model", model.attributes.title));
  });

  /* Create Wish model data */
  InitialData.WishData.forEach((item) => {
    new model.Wish(item).save()
    .then((model) => console.log("Created wish model", model.attributes.userId, model.attributes.projectId))
    .catch((err) => console.error("Error in WishData initialization", err));
  });

  /* Create UserProject model data */
  InitialData.UserProjectData.forEach((item)=>{
    new model.UserProject(item).save()
    .then((model) => console.log("Created userProject model", model.attributes.id));
  });

  /* Create Post model data */
  InitialData.PostData.forEach((item)=>{
    new model.Post(item).save()
    .then((model) => console.log("Created Post model", model.attributes.id));
  });

  /* Create Like model data */
  InitialData.LikeData.forEach((item) => {
    new model.Like(item).save()
    .then((model) => console.log("Created Like model", model.attributes.id));
  });

  /* Create Report model data */
  InitialData.ReportData.forEach((item) => {
    new model.Report(item).save()
    .then((model) => console.log("Created Report model", model.attributes.id));
  });

  /* Create PostImage model data */
  InitialData.PostImageData.forEach((item)=>{
    new model.PostImage(item).save()
    .then((model)=>console.log("Created PostImage model", model.attributes.id));
  });

  /* Transaction model data */
  InitialData.TransactionData.forEach((item) => {
    new model.Transaction(item).save()
    .then((model) => console.log("Created Transaction model", model.attributes.id));
  });
};

export default initDB;
