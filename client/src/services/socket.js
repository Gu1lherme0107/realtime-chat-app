import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
console.log('🔗 Socket URL:', SOCKET_URL);

export const socket = io(SOCKET_URL, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5
});

export const connectSocket = () => {
  socket.connect();
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export const sendMessage = (text) => {
  socket.emit('send_message', { text });
};

export const onReceiveMessage = (callback) => {
  socket.on('receive_message', callback);
};

export const onUserConnected = (callback) => {
  socket.on('user_connected', callback);
};

export const onUserDisconnected = (callback) => {
  socket.on('user_disconnected', callback);
};