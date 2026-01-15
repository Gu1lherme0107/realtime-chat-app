export default function Message({ message, isSelf }) {
  return (
    <div className={`message ${isSelf ? 'self' : 'other'}`}>
      <p>{message.text}</p>
      <small>{new Date(message.timestamp).toLocaleTimeString()}</small>
    </div>
  );
}