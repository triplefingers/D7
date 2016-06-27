const checkLogin = () => {
  return (req, res) => {
    if (req.user) {
      res.status(200).send();
    } else {
      res.status(401).send();
    }
  };
};

export default checkLogin;