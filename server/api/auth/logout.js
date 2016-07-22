const logout = () => {
  return (req, res) => {
    console.log(req.user);
    req.logOut();
    // res.redirect("/");
    return res.status(200).json({
      message: "You have been successfully logged out."
    });
  };
};

export default logout;
