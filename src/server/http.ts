import express from 'express';

import { registApi } from './api';
import { registRoutes } from './routes';
import { registDevServer } from './registers/devServer';
import { registLogger } from './registers/logger';
import { registCompressor } from './registers/compressor';
import { registParser } from './registers/parser';
import { registSession } from './registers/session';
import { registStatic } from './registers/static';

const isDevelopment = process.env.NODE_ENV === 'development' || false;
const port = parseInt(process.env.PORT_HTTP || '', 10) || 3000;

async function main() {
  const app = express();

  if (isDevelopment) {
    await registDevServer(app);
  } else {
    registCompressor(app);
  }

  registLogger(app, isDevelopment);
  registParser(app);
  registSession(app, isDevelopment);
  registStatic(app, isDevelopment);
  registApi(app);
  registRoutes(app);

  app.listen(port);
}

export function runHttp() {
  main().then(() => console.log(`http: port[${port}]`));
}
