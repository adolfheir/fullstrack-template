"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
const server_1 = require("./server/server");
const server = (0, server_1.createServer)();
server.start();
