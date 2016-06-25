/* Passport Login Handler */
import passport from "passport";

const login = () => {
  return (req, res, next) => {
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
  };
};

export default login;