module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log(`👤 Usuário conectado: ${socket.id}`);

    // Evento: usuário se conecta
    io.emit('user_connected', {
      message: `Usuário ${socket.id} entrou no chat`,
      userCount: io.engine.clientsCount
    });

    // receber mensagem do frontend
    socket.on('send_message', (data) => {
      console.log(`Mensagem recebida:`, data);

      // Validar mensagem vazia
      if (!data.text || data.text.trim() === '') {
        return;
      }

      // enviar mensagem para todos os usuários conectados
      io.emit('receive_message', {
        id: socket.id,
        text: data.text,
        timestamp: new Date(),
        isSelf: false
      });
    });

    // Evento: usuário desconecta
    socket.on('disconnect', () => {
      console.log(`👋 Usuário desconectado: ${socket.id}`);
      io.emit('user_disconnected', {
        message: `Usuário ${socket.id} saiu do chat`,
        userCount: io.engine.clientsCount
      });
    });
  });
};
