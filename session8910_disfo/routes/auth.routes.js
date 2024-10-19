const router = require("express").Router();

const { postSignup, postLogin } = require("../controllers/auth.controllers");

const { userValidationSchema } = require("../validations/user.validator");
const { loginValidationSchema } = require("../validations/login.validator");
const { validateSchema } = require("../middlewares/validate.middleware");

const validateUser = validateSchema(userValidationSchema); // middleware
const validateLogin = validateSchema(loginValidationSchema); // middleware

router.post("/signup", validateUser, postSignup);
router.post("/login", validateLogin, postLogin);

module.exports = router;
