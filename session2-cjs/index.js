const express = require("express");
const {
  getCurrencies,
  getCurrencyBySymbol,
} = require("./controllers/currencies.controllers");
const {
  getUsers,
  getUserById,
  searchUsers,
} = require("./controllers/users.controllers");

const server = express();
const PORT = 8082;

server.get("/", (req, res) => {
  res.send(`<h1 style="color: red">Currency Database</h1>`);
});

server.get("/currencies", getCurrencies);
server.get("/currencies/:symbol", getCurrencyBySymbol);

server.get("/users", getUsers);
server.get("/users/search", searchUsers);
server.get("/users/:uuid", getUserById);

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
