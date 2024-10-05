import currenciesJson from "../currency.json" with { type: "json" };

const getCurrencies = (req, res) => {
  const { min_value } = req.query;
  if (min_value)
    return res.send(
      currenciesJson.data.filter((curr) => curr.min_size === min_value)
    );
  res.send(currenciesJson.data);
};

const getCurrencyBySymbol = (req, res) => {
  const { symbol } = req.params;
  const reqCurrency = currenciesJson.data.find(
    (curr) => curr.id === symbol.toUpperCase()
  );

  if (reqCurrency) return res.send(reqCurrency);
  res.status(404).send({
    message: `Currency with symbol: '${symbol}' could not be found`,
  });
};

export { getCurrencies, getCurrencyBySymbol };
