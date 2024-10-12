const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String, default: "" },
    author: { type: [String], default: [] },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
