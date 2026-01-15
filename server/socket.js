const MAX_MESSAGE_LENGTH = 500;
const MESSAGE_RATE_LIMIT = 100; // ms entre mensagens
const userTimestamps = new Map(); // Controlar rate limiting por usuário

// Sanitizar texto para evitar XSS
function sanitizeText(text) {
  if (typeof text !== 'string') return '';
  return text
    .trim()
    .slice(0, MAX_MESSAGE_LENGTH)
    .replace(/[<>]/g, ''); // Remove < e > para evitar HTML injection
}

// Verificar rate limiting
function isRateLimited(userId) {
  const now = Date.now();
  const lastMessageTime = userTimestamps.get(userId) || 0;
  
  if (now - lastMessageTime < MESSAGE_RATE_LIMIT) {
    return true;
  }
  
  userTimestamps.set(userId, now);
  return false;
}

module.exports = function(io) {
  io.on('connection', (socket) => {
    const NODE_ENV = process.env.NODE_ENV || 'development';
    
    if (NODE_ENV === 'development') {
      console.log(`👤 Usuário conectado: ${socket.id}`);
    }

    try {
      // Evento: usuário se conecta
      io.emit('user_connected', {
        message: `Usuário entrou no chat`,
        userCount: io.engine.clientsCount,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Erro ao emitir user_connected:', error);
    }

    // receber mensagem do frontend
    socket.on('send_message', (data) => {
      try {
        // Validação básica
        if (!data || typeof data !== 'object') {
          socket.emit('error', { message: 'Dados inválidos' });
          return;
        }

        // Sanitizar e validar mensagem
        const sanitizedText = sanitizeText(data.text);
        
        if (!sanitizedText || sanitizedText.length === 0) {
          socket.emit('error', { message: 'Mensagem não pode estar vazia' });
          return;
        }

        // Rate limiting
        if (isRateLimited(socket.id)) {
          socket.emit('error', { message: 'Você está enviando mensagens muito rápido' });
          return;
        }

        if (NODE_ENV === 'development') {
          console.log(`📨 Mensagem de ${socket.id}:`, sanitizedText);
        }

        // enviar mensagem para todos os usuários conectados
        io.emit('receive_message', {
          id: socket.id,
          text: sanitizedText,
          timestamp: new Date(),
          isSelf: false
        });
      } catch (error) {
        console.error('Erro ao processar mensagem:', error);
        socket.emit('error', { message: 'Erro ao processar mensagem' });
      }
    });

    // Evento: usuário desconecta
    socket.on('disconnect', () => {
      try {
        if (NODE_ENV === 'development') {
          console.log(`👋 Usuário desconectado: ${socket.id}`);
        }
        
        // Limpar dados de rate limiting
        userTimestamps.delete(socket.id);
        
        io.emit('user_disconnected', {
          message: `Usuário saiu do chat`,
          userCount: io.engine.clientsCount,
          timestamp: new Date()
        });
      } catch (error) {
        console.error('Erro ao processar disconnect:', error);
      }
    });

    // Tratamento de erros de socket
    socket.on('error', (error) => {
      console.error('Erro de socket:', error);
    });
  });
};
