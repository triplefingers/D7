/* Passport local setting */

import passport from "passport";
import LocalStrategy from "passport-local";
import model from "../../db/models";
import bcrypt from "bcryptjs";

const localSetup = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    model.User.forge().where({id: id}).fetch({require: true})
    .then((user) => done(null, user.toJSON()))
    .catch((err) => done(err, false));
  });
  passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
  }, (email, password, done) => {
    model.User.forge()
    .where({email: email})
    .fetch({require: true})
    .then((user) => {
      user = user.toJSON();
      if(bcrypt.compareSync(password, user.password)){
        done(null, user);
      } else {
        done(null, false, { message: "Incorrect password."});
      }
    }).catch((err) => {
      done(null, false, { message: "Incorrect username" });
    });
  }));
};

export default localSetup;