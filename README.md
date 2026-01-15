# 💬 Chat em Tempo Real

![License](https://img.shields.io/badge/license-MIT-green)
![Node.js](https://img.shields.io/badge/Node.js-v18+-brightgreen)
![React](https://img.shields.io/badge/React-18+-blue)
![Socket.IO](https://img.shields.io/badge/Socket.IO-WebSocket-orange)

Um aplicativo de **chat em tempo real** fullstack desenvolvido com React, Node.js e Socket.IO que permite múltiplos usuários trocarem mensagens instantaneamente via navegador.

## 🚀 Demo ao Vivo

**[https://realtime-chat-app-judj-qsox694ov-gu1lherme0107s-projects.vercel.app/](#)** 

---

## ✨ Funcionalidades

- ✅ **Chat em tempo real** com WebSockets (Socket.IO)
- ✅ **Múltiplos usuários simultâneos** com sincronização instantânea
- ✅ **Contador de usuários online** atualizado em tempo real
- ✅ **Interface moderna** com design inspirado em Node.js
- ✅ **Responsivo** para desktop e mobile
- ✅ **Scroll automático** para novas mensagens
- ✅ **Validação de mensagens** vazias no backend

---

## 🧱 Stack Tecnológico

### Frontend
- **React 18** - Biblioteca UI
- **Vite** - Build tool e dev server
- **Socket.IO Client** - Conexão WebSocket
- **CSS Moderno** - Design responsivo

### Backend
- **Node.js** - Runtime JavaScript server-side
- **Express** - Framework web
- **Socket.IO** - Comunicação em tempo real
- **CORS** - Configuração de requisições

### DevOps
- **Git & GitHub** - Controle de versão
- **Render** - Deploy do backend
- **Vercel** - Deploy do frontend

---

## 📋 Pré-requisitos

- Node.js >= 18.0.0
- npm ou yarn
- Git

---

## 🛠️ Instalação Local

### 1. Clone o repositório

```bash
git clone https://github.com/Gu1lherme0107/realtime-chat-app.git
cd realtime-chat-app
```

### 2. Setup Backend

```bash
cd server
npm install
npm start
```

O servidor iniciará em `http://localhost:5000`

### 3. Setup Frontend (em outro terminal)

```bash
cd client
npm install
npm run dev
```

A aplicação abrirá em `http://localhost:5173`

---

## 📁 Estrutura do Projeto

```
realtime-chat-app/
├── server/
│   ├── index.js           # Configuração Express + Socket.IO
│   ├── socket.js          # Lógica dos eventos WebSocket
│   ├── package.json
│   └── .env               # Variáveis de ambiente
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Chat.jsx      # Componente principal
│   │   │   ├── Message.jsx   # Renderizar mensagem individual
│   │   │   └── UserInput.jsx # Input + botão enviar
│   │   ├── services/
│   │   │   └── socket.js     # Configuração Socket.IO
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🔌 Fluxo de Dados

```
[Frontend Input]
       ↓
   [Socket.emit]
       ↓
   [Backend Socket]
       ↓
   [Validação]
       ↓
   [io.emit para todos]
       ↓
   [Frontend recebe]
       ↓
   [Renderiza mensagem]
```

---

## 🌐 Eventos Socket.IO

### Enviados pelo Client

| Evento | Descrição | Dados |
|--------|-----------|-------|
| `send_message` | Envia mensagem ao servidor | `{ text: string }` |

### Recebidos pelo Client

| Evento | Descrição | Dados |
|--------|-----------|-------|
| `receive_message` | Nova mensagem recebida | `{ id, text, timestamp }` |
| `user_connected` | Usuário se conectou | `{ message, userCount }` |
| `user_disconnected` | Usuário se desconectou | `{ message, userCount }` |

---

## 🎨 Design & UX

- **Cores Node.js**: Verde (#68A063) + Tons escuros
- **Tipografia**: System fonts para performance
- **Animações**: Fade-in nas mensagens, transitions suaves
- **Scroll**: Automático para a última mensagem
- **Mobile First**: Layout responsivo

---

## 🚀 Deploy

### Backend (Render)

1. Acesse [render.com](https://render.com)
2. Conecte seu GitHub
3. Criar novo **Web Service**
4. Build Command: `cd server && npm install`
5. Start Command: `cd server && npm start`

### Frontend (Vercel)

1. Acesse [vercel.com](https://vercel.com)
2. Importe seu repositório
3. Framework: `Vite`
4. Root Directory: `client`
5. Environment: `VITE_SOCKET_URL=<sua-url-render>`

---

## 📚 O Que Aprendi

✓ **WebSockets** - Comunicação bidirecional em tempo real  
✓ **Socket.IO** - Biblioteca abstrata sobre WebSockets  
✓ **React Hooks** - useState, useEffect, useRef  
✓ **Cleanup de listeners** - Prevenir memory leaks  
✓ **CORS** - Requisições cross-origin  
✓ **Deploy** - Frontend (Vercel) + Backend (Render)  
✓ **Git** - Versionamento e workflow profissional  

---

## 🐛 Troubleshooting

### Mensagens aparecem 2x
- **Solução**: Certificar que listeners estão sendo removidos com `socket.off()`

### Backend não conecta
- Verificar se CORS está habilitado
- Confirmar que `CLIENT_URL` está correto no Render

### Mensagens não sincronizam
- Abrir DevTools → Console para erros
- Verificar conexão WebSocket na aba Network

---

## 🤝 Como Contribuir

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📈 Roadmap (v2)

- [ ] Autenticação com Login
- [ ] Salas de chat (channels)
- [ ] Nome de usuário personalizável
- [ ] Indicador "digitando..."
- [ ] Emojis e reações
- [ ] Histórico persistido em banco (MongoDB)
- [ ] Dark mode toggle
- [ ] Notificações de som

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Guilherme Lima**

- GitHub: [@Gu1lherme0107](https://github.com/Gu1lherme0107)
- Email: vipgui0606@gmail.com
- LinkedIn: [Seu LinkedIn](#)

---

## ⭐ Se Gostou

Se este projeto foi útil para você, considere dar uma ⭐ no GitHub!

---

## 📞 Suporte

Tem dúvidas? Abra uma [Issue](https://github.com/Gu1lherme0107/realtime-chat-app/issues) ou entre em contato!
