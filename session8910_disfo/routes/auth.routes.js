const router = require("express").Router();

const { postSignup, postLogin } = require("../controllers/auth.controllers");

const { userValidationSchema } = require("../validations/user.validator");
const { validateSchema } = require("../middlewares/validate.middleware");
const validateUser = validateSchema(userValidationSchema); // middleware

router.post("/signup", validateUser, postSignup);
router.post("/login", postLogin);

module.exports = router;
