let http = require("http");
let routes = require("./index")
let server = http.createServer(routes);

server.listen(3000);