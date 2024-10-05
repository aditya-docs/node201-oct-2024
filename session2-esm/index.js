import express from "express";
import {
  getCurrencies,
  getCurrencyBySymbol,
} from "./controllers/currencies.controllers.js";

const server = express();
const PORT = 8082;

server.get("/", (req, res) => {
  res.send(`<h1 style="color: red">Currency Database</h1>`);
});

server.get("/currencies", getCurrencies);
server.get("/currencies/:symbol", getCurrencyBySymbol);

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
