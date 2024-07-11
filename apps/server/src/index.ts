import 'dotenv/config';
// import 'module-alias/register';
// import "./aliases"

import { createServer } from './server';

const server = createServer();

server.start();
