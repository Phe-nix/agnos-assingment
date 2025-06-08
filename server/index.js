const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
let latestPatientData = {};

wss.on('connection', (ws) => {

  ws.send(JSON.stringify({ type: 'init', data: latestPatientData }));

  ws.on('message', (message) => {
    const parsed = JSON.parse(message);
    if (parsed.type === 'update') {
      latestPatientData = parsed.data;

      // Broadcast to all clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ type: 'update', data: latestPatientData }));
        }
      });
    }
  });
});

console.log("WebSocket server running on ws://localhost:8080");
