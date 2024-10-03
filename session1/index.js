const http = require("http");
const currenciesJson = require("./currency.json");
const PORT = 8082;

const server = http.createServer((req, res) => {
  // console.log(req);
  // const serverInfo = {
  //   serverName: "Crio Server",
  //   version: "1.0.0",
  //   currentDate: new Date().toDateString(),
  //   currentTime: new Date().toTimeString(),
  // };

  // res.writeHead(200, { "content-type": "application/json" });
  // res.end(JSON.stringify(serverInfo));

  // res.writeHead(200, { "content-type": "text/html" });
  // res.write("<h1>Hello</h1>");
  // res.end("<h2>server</h2>");

  // if (req.url === "/status") {
  //   res.writeHead(200, { "Content-Type": "application/json" }); //Adding Headers
  //   res.write(JSON.stringify(serverInfo));
  //   res.end();
  // } else {
  //   res.writeHead(200, { "Content-Type": "text/html" }); //Adding Headers
  //   res.write(`<h1>Hello from server</h1>`);
  //   res.end();
  // }

  // if (req.url === "/") {
  //   res.writeHead(200, { "content-type": "text/html" });
  //   res.end("<h1>Currency Database</h1>");
  // } else if (req.url === "/currencies") {
  //   res.writeHead(200, { "content-type": "application/json" });
  //   res.end(JSON.stringify(currenciesJson));
  // } else {
  //   res.writeHead(404, { "content-type": "application/json" });
  //   res.end(JSON.stringify({ message: `Route: '${req.url}' was not found` }));
  // }

  switch (req.url) {
    case "/":
      res.writeHead(200, { "content-type": "text/html" });
      res.end("<h1>Currency Database</h1>");
      break;
    case "/currencies":
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(currenciesJson));
      break;
    default:
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: `Route: '${req.url}' was not found` }));
  }
});

server.listen(PORT, () => {
  console.log(`server running on: ${PORT}`);
});
