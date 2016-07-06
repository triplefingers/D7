import model from "../db/models";
import collection from "../db/collections";

/* Update user detail in 'user' table */
/* Post Data: userPhoto(publicId from Cloudinary), username, password, email */
const user = (user, q, body, res) => {
  const userId = user.id;
  const { userPhoto, username, password, email } = body;

  // Test code below
  // let userId;
  // if (user && user.id) {
  //   userId = user.id;
  // }
  // if (q && q.id) {
  //   userId = q.id;
  // } else {
  //   userId = 1;
  // }

  const editData = {
    photo: userPhoto,
    username: username,
    password: password,
    email: email
  };

  /* Delete keys with undefined value */
  for (let key in editData) {
    if (editData[key] === undefined) {
      delete editData[key];
    }
  }

  model.User.where("id", userId).fetch()
  .then((user) => {
    if (user) {
      return user;
    } else {
      /* Throw error if there is now user matching */
      throw "Invalid userId";
    }
  })
  .then((user) => {
    /* check for empty property */
    for (let key in editData) {
      if (editData[key] === undefined) {
        delete editData[key];
      }
    }
    return new model.User({id: user.id}).save(editData);
  })
  .then((data) => {
    data = data.toJSON();
    res.status(200).send(data);
  })
  .catch((err) => "Error: Failed to edit user profile: " + err);
};

export default user;
