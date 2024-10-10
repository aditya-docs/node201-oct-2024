const router = require("express").Router();
const {
  getUsers,
  getUserById,
  searchUsers,
} = require("../controllers/users.controllers");
const verifyAuth = require("../middlewares/verifyAuth");
const userSearchValidator = require("../middlewares/userSearchValidator");
const queryValidator = require("../middlewares/queryValidator");
const { userSearchSchema } = require("../validations/users.validations");

// router.use(verifyAuth);

router.get("/", getUsers);
// router.get("/search", userSearchValidator, searchUsers);
router.get("/search", queryValidator(userSearchSchema), searchUsers);
router.get("/:uuid", getUserById);

module.exports = router;
