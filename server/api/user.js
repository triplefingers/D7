import model from "../db/models";
import collection from "../db/collections";

const user = (user, q, body, res) => {
  // const userId = user.id;
  const { userPhoto, username, password, email } = body;
  const editData = {
    photo: userPhoto,
    username: username,
    password: password,
    email: email
  };

  // below should be deleted
  let userId;
  if (user && user.id) {
    userId = user.id;
  }
  if (q && q.id) {
    userId = q.id;
  } else {
    userId = 1;
  }

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
    console.log("Edited data is ", editData);
    return new model.User({id: user.id}).save(editData);
  })
  .then((data) => {
    data = data.toJSON();
    res.status(200).send(data);
  })
  .catch((err) => "Error: Failed to edit user profile: " + err);
};

export default user;
