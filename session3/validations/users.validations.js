const Joi = require("joi");
const { possibleGenders } = require("../config");

const userSearchSchema = Joi.object({
  gender: Joi.string().valid(...possibleGenders),
  age: Joi.number().integer().min(0).max(100),
}).or("gender", "age");

module.exports = { userSearchSchema };
