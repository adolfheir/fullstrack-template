import 'dotenv/config';
import 'module-alias/register';
import { createServer } from './server';

const server = createServer();

void server.start();
