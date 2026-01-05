const MessageItem = ({ message }) => {
  const { sender, text, time, isOwn } = message;

  return (
    <div className={`chat ${isOwn ? "chat-end" : "chat-start"}`}>

      <div className="chat-header">
        {!isOwn && sender.name}
        <time className="text-xs opacity-50 ml-2">{time}</time>
      </div>

      <div className="chat-bubble">{text}</div>

      <div className="chat-footer opacity-50">
        {isOwn ? "Delivered" : ""}
      </div>
    </div>
  );
};

export default MessageItem;
