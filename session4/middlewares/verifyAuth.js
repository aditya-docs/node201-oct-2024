const verifyAuth = (req, res, next) => {
  if (req.headers.authorization !== process.env.PASSWORD)
    return res.status(401).send({ message: "Unauthorized" });
  next();
};

module.exports = verifyAuth;
