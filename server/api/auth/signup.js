/* Passport Signup Handler */
import model from "../../db/models";

const signup = () => {
  return (req, res, next) => {
    new model.User({email: req.body.email, password: req.body.password, username: req.body.username}).save()
    .then((user) => {
      console.log(user);
      req.login(user, (err)=>{
        if(!err){
          return res.status(200).json({ message: "You have been successfully signed in." });
        } else {
          return res.status(401).json({ message: "You have been successfully signed up but there is something wrong logging in. Please try login again." });
        }
      });
    })
    .catch((err) => {
      return res.status(401).json({ message: "This email is already registered. Please try another email." });
    });
  };
};

export default signup;
