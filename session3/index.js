const express = require("express");
const currenciesRouter = require("./routes/currencies.routes");
const userRouter = require("./routes/users.routes");

const server = express();
const PORT = 8082;

server.get("/", (req, res) => {
  res.send(`<h1 style="color: red">Currency Database</h1>`);
});

server.use("/currencies", currenciesRouter);
server.use("/users", userRouter);

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
