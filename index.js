const http = require("http");
const app = require("./app");
let port = 3000;


const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
});