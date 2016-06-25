const logout = () => {
  return (req, res) => {
    req.logout();
    return res.status(200).json({
      message: "You have been successfully logged out."
    });
  };
};

export default logout;