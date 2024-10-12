const Joi = require("joi");

const blogIdSchema = Joi.object({
  blogId: Joi.string()
    .pattern(/^[a-f\d]{24}$/)
    .required(),
});

module.exports = { blogIdSchema };
