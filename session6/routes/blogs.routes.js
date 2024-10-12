const router = require("express").Router();
const {
  createNewBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} = require("../controllers/blogs.controllers");
const pathValidator = require("../middlewares/pathValidator");
const { blogIdSchema } = require("../validations/blogs.validations");

router.post("/new", createNewBlog);
router.get("/", getAllBlogs);

// router.get("/:blogId", getBlogById);
// router.patch("/:blogId", updateBlogById);
// router.delete("/:blogId", deleteBlogById);

router
  .route("/:blogId") //clubbing of the routes in previous 3 lines into one
  .all(pathValidator(blogIdSchema)) //middleware to validate the path parameter
  .get(getBlogById)
  .patch(updateBlogById)
  .delete(deleteBlogById);

module.exports = router;
