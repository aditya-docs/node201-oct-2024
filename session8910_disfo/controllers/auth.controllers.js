const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();

const postSignup = async (req, res) => {
  try {
    const newUser = await AuthServiceInstance.create(req.body);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const postLogin = async (req, res) => {};

module.exports = { postSignup, postLogin };
