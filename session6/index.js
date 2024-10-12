const express = require("express");
require("dotenv").config();
const connectDB = require("./db/config.js");
const currenciesRouter = require("./routes/currencies.routes");
const userRouter = require("./routes/users.routes");
const blogRouter = require("./routes/blogs.routes");
const verifyAuth = require("./middlewares/verifyAuth");

const server = express();
const PORT = 8082;
connectDB();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h1 style="color: red">Currency Database</h1>`);
});

server.use("/currencies", currenciesRouter);

// server.use(verifyAuth);

server.use("/users", userRouter);
server.use("/blogs", blogRouter);

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
