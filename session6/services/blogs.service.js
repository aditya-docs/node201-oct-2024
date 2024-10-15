const Blog = require("../models/blog.model");

class BlogService {
  create = (payload) => Blog.create(payload);

  getAll = () => Blog.find();

  getById = (id) => Blog.findById(id);

  updateById = (id, payload) =>
    Blog.findByIdAndUpdate(id, payload, { new: true });

  deleteById = (id) => Blog.findByIdAndDelete(id);

  search = (title, author) => {
    const titleRegex = new RegExp(title);
    if (title && author)
      return Blog.find({
        $and: [
          { title: { $regex: titleRegex, $options: "i" } },
          { author: { $elemMatch: { email: author } } },
        ],
      });
    if (title)
      return Blog.find({ title: { $regex: titleRegex, $options: "i" } });
    if (author) return Blog.find({ author: { $elemMatch: { email: author } } });
  };
}

module.exports = BlogService;
