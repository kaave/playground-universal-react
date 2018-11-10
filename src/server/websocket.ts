import { Server as WebSocketServer } from 'ws';
import winston from 'winston';
import format from 'date-fns/format';

const isDevelopment = process.env.NODE_ENV === 'development' || false;
const port = parseInt(process.env.PORT_WEBSOCKET || '', 10) || 3000;

const logFormat = winston.format.printf(
  info => `${format(new Date(), 'YYYY-MM-DD HH:mm:ss.SSS')} ${info.level}: ${info.message}`,
);

const logger = winston.createLogger({
  transports: isDevelopment
    ? [new winston.transports.Console()]
    : [
        new winston.transports.Console(),
        new winston.transports.File({ filename: `logs/${process.env.WEBSOCKET_LOG || 'websocket.log'}` }),
      ],
  format: winston.format.combine(logFormat),
});

async function main() {
  const wss = new WebSocketServer({ port });

  wss.on('connection', ws => {
    ws.on('message', message => logger.info(`received: ${message}`));
    setInterval(() => ws.send(`${new Date()}`), 1000);
  });
}

export function runWS() {
  main().then(() => console.log(`websocket: port[${port}]`));
}
