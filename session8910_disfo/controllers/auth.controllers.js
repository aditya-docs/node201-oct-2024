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

const postLogin = async (req, res) => {
  try {
    const { isLoggedIn, userId } = await AuthServiceInstance.login(req.body);
    if (!isLoggedIn)
      return res.status(401).send({ message: "Invalid credentials" });
    res
      .status(200)
      .cookie(
        "remember_user_token",
        AuthServiceInstance.generateToken({ userId }),
        {
          httpOnly: true,
          maxAge: 20 * 1000,
        }
      )
      .send({ isLoggedIn, userId });
  } catch (error) {
    if (error.message === "User not found")
      return res.status(401).send({ message: error.message });
    res.status(500).send({ message: error.message });
  }
};

module.exports = { postSignup, postLogin };
