const express = require("express");
const currenciesJson = require("./currency.json");

const server = express();
const PORT = 8082;

server.get("/", (req, res) => {
  res.send(`<h1 style="color: red">Currency Database</h1>`);
});

server.get("/currencies", (req, res) => {
  const { min_value } = req.query;
  if (min_value)
    return res.send(
      currenciesJson.data.filter((curr) => curr.min_size === min_value)
    );
  res.send(currenciesJson.data);
});

server.get("/currencies/:symbol", (req, res) => {
  const { symbol } = req.params;
  const reqCurrency = currenciesJson.data.find(
    (curr) => curr.id === symbol.toUpperCase()
  );

  if (reqCurrency) return res.send(reqCurrency);
  res.status(404).send({
    message: `Currency with symbol: '${symbol}' could not be found`,
  });
});

// server.get("/posts/:postId/comments/:commentId", (req, res) => {
//   console.log(req.params);
// });

server.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
