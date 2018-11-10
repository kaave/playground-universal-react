import { Server as WebSocketServer } from 'ws';

async function main(port: number) {
  const wss = new WebSocketServer({ port });

  wss.on('connection', ws => {
    ws.on('message', message => console.log('received:', message));
    setInterval(() => ws.send(`${new Date()}`), 1000);
  });
}

export function runWS() {
  const port = parseInt(process.env.PORT_WEBSOCKET || '', 10) || 4000;

  main(port).then(() => console.log(`websocket: port[${port}]`));
}
