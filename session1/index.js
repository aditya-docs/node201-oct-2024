const http = require("http");
const PORT = 8082;

const server = http.createServer((req, res) => {
  console.log("request received");
  const serverInfo = {
    name: "crio-server",
    version: "1.0.0",
  };
  //   res.writeHead(200, { "content-type": "application/json" });
  //   res.write(JSON.stringify(serverInfo));

  res.writeHead(200, { "content-type": "text/html" });
  res.write("<h1>Hello</h1>");
  res.end("<h2>server</h2>");
});

server.listen(PORT, () => {
  console.log(`server running on: ${PORT}`);
});
