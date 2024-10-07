import express from "express"
import http from "http"
import WebSocket from "ws";
import path from 'path'

const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

app.use("/public", express.static('public'));

wss.on('connection', (ws) => {
  console.log('Novo cliente WebSocket conectado.');

  ws.send('Bem-vindo ao WebSocket integrado com Express!');

  ws.on('message', (message) => {
    console.log(`Mensagem recebida: ${message}`);
    ws.send(`Você: ${message}`);
  });

  ws.on('close', () => {
    console.log('Cliente WebSocket desconectado.');
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + "/.." + "/public" + "/index.html"));
});

server.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');
});
