const bcrypt = require("bcrypt");
const User = require("../models/user.model");

class AuthService {
  create = async (payload) => {
    const newUser = new User({
      ...payload,
      password: await this.hashPassword(payload.password),
    });
    return newUser.save();
  };

  hashPassword = (password) => bcrypt.hash(password, 10);
}

module.exports = AuthService;
