const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Testar conexão
app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});

// Import dos eventos Socket
require('./socket')(io);

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});