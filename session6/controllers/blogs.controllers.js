const BlogService = require("../services/blogs.service");
const BlogServiceInstance = new BlogService();

const createNewBlog = async (req, res) => {
  try {
    res.status(201).send(await BlogServiceInstance.create(req.body));
  } catch (error) {
    if (error.name === "ValidationError")
      return res.status(400).send({ message: error.message });
    if (error.code === 11000)
      return res
        .status(409)
        .send({ message: "Blog with this title already exists" });
    res.status(500).send({ message: `Something went wrong: ${error.message}` });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    res.send(await BlogServiceInstance.getAll());
  } catch (error) {
    res.status(500).send({ message: `Something went wrong: ${error.message}` });
  }
};

const getBlogById = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await BlogServiceInstance.getById(blogId);
    if (blog) return res.send(blog);
    res.status(404).send({ message: `Blog with id: ${blogId} not found` });
  } catch (error) {
    res.status(500).send({ message: `Something went wrong: ${error.message}` });
  }
};

const updateBlogById = async (req, res) => {
  const { blogId } = req.params;
  try {
    const updatedBlog = await BlogServiceInstance.updateById(blogId, req.body);
    if (!updatedBlog)
      return res
        .status(404)
        .send({ message: `Blog with id: ${blogId} not found` });
    res.send(updatedBlog);
  } catch (error) {
    res.status(500).send({ message: `Something went wrong: ${error.message}` });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const deletedBlog = await BlogServiceInstance.deleteById(blogId);
    if (!deletedBlog)
      return res
        .status(404)
        .send({ message: `Blog with id: ${blogId} not found` });
    res.sendStatus(204);
    // res.send({ message: `Blog with id: ${blogId} deleted` });
  } catch (error) {
    res.status(500).send({ message: `Something went wrong: ${error.message}` });
  }
};

const searchBlogs = async (req, res) => {
  const { title, author } = req.query;
  if (title || author)
    return res.send(await BlogServiceInstance.search(title, author));
  res.status(400).send({
    message: "Please provide either title or author as query parameter",
  });
};

module.exports = {
  createNewBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
  searchBlogs,
};
