const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// CORS configuration - aceita múltiplas origens do Vercel
const allowedOrigins = [
  CLIENT_URL,
  'http://localhost:5173',
  'https://realtime-chat-app-judj.vercel.app'
];

// Função para verificar origem
const corsOptions = {
  origin: (origin, callback) => {
    // Permite requisições sem origin (mobile apps, Postman, etc) ou do Vercel
    if (!origin || allowedOrigins.some(allowed => origin.includes('vercel.app')) || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
};

const io = socketIo(server, {
  cors: corsOptions,
  transports: ['websocket', 'polling']
});

// Middleware
app.use(cors(corsOptions));
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