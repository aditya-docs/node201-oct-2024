const pathValidator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.params);
  if (error) return res.status(400).send({ message: error.details[0].message });
  next();
};

module.exports = pathValidator;
