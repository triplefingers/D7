const checkLogin = () => {
  return (req, res) => {
    if (req.user) {
      res.status(200).send({loggedIn: true});
    } else {
      res.status(200).send({loggedIn: false});
    }
  };
};

export default checkLogin;
