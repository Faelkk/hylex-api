import express from "express";
import http from "node:http";
import { router } from "./routers/router";
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const port = 5001;

app.use(cors());

app.use(express.json());
app.use(router);

server.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
