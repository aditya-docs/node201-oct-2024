const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const UserService = require("./user.service");
const userServiceInstance = new UserService();

class AuthService {
  create = async (payload) => {
    const newUser = new User({
      ...payload,
      password: await this.hashPassword(payload.password),
    });
    return newUser.save();
  };

  hashPassword = (password) => bcrypt.hash(password, 10);

  login = async ({ username, password }) => {
    const user = await userServiceInstance.findByUsername(username);
    if (!user) throw new Error("User not found");
    return {
      isLoggedIn: await this.verifyPassword(password, user.password),
      userId: user._id,
    };
  };

  verifyPassword = (password, hashedPassword) =>
    bcrypt.compare(password, hashedPassword);

  generateToken = (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 20 });
}

module.exports = AuthService;
