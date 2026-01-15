import { useEffect, useState, useRef } from 'react';
import { 
  socket, 
  connectSocket, 
  onReceiveMessage, 
  onUserConnected, 
  onUserDisconnected 
} from '../services/socket';
import Message from './Message';
import UserInput from './UserInput';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    connectSocket();

    // Registrar listeners
    socket.on('user_connected', (data) => {
      console.log(data.message);
      setUserCount(data.userCount);
    });

    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('user_disconnected', (data) => {
      console.log(data.message);
      setUserCount(data.userCount);
    });

    // Cleanup: remover listeners ao desmontar
    return () => {
      socket.off('user_connected');
      socket.off('receive_message');
      socket.off('user_disconnected');
      socket.disconnect();
    };
  }, []);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Chat em Tempo Real</h1>
        <p>Usuários online: {userCount}</p>
      </div>
      
      <div className="messages-container">
        {messages.map((msg, idx) => (
          <Message key={idx} message={msg} isSelf={msg.id === socket.id} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <UserInput />
    </div>
  );
}