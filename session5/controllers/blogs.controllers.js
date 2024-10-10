const Blog = require("../models/blog.model");

const createNewBlog = async (req, res) => {
  try {
    res.send(await Blog.create(req.body));
  } catch (error) {
    res.status(500).send({ message: `Something went wrong: ${error.message}` });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    res.send(await Blog.find());
  } catch (error) {
    res.status(500).send({ message: `Something went wrong: ${error.message}` });
  }
};

const getBlogById = async (req, res) => {
  const { blogId } = req.params;
  try {
    const blog = await Blog.findById(blogId);
    if (blog) return res.send(blog);
    res.status(404).send({ message: `Blog with id: ${blogId} not found` });
  } catch (error) {
    if (error.name === "CastError")
      return res.status(400).send({ message: `Invalid blog id: ${blogId}` });
    res.status(500).send({ message: `Something went wrong: ${error.message}` });
  }
};

module.exports = { createNewBlog, getAllBlogs, getBlogById };
