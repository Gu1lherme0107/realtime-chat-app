const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// CORS configuration - apenas aceita origem do frontend
const io = socketIo(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true
  },
  transports: ['websocket', 'polling']
});

// Middleware
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Servidor rodando',
    env: NODE_ENV 
  });
});

// Error handling para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Import dos eventos Socket
require('./socket')(io);

// Iniciar servidor
server.listen(PORT, () => {
  if (NODE_ENV === 'development') {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
    console.log(`🌐 CORS permitido para: ${CLIENT_URL}`);
  }
});