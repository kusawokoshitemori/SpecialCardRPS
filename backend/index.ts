const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const PORT = 4000;

server.listen(PORT, () => console.log(`サーバーに接続しました PORT = ${PORT}`));
