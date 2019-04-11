/* eslint-disable import/no-extraneous-dependencies */

import * as jsonServer from 'json-server';
import Dotenv from 'dotenv';

import { data } from './data';

Dotenv.config();

const port = parseInt(process.env.PORT_API || '24680', 10);
const apiVersion = process.env.API_VERSION || 'v1';
const server = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(`/api/${apiVersion}`, router);
server.listen(port, () => console.log(`JSON Server is running. [http://localhost:${port}]`));
