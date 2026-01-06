import { useState } from "react";
import api from "../services/api";
import { useChat } from "../context/ChatContext";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { selectedChat } = useChat();
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!text.trim()) return;
    setText("");

    setLoading(true)
    try {
     await api.post(`/message`,{text,chatId:selectedChat._id})
      
    } catch (err) {
      console.error(err);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="p-3 border-t border-gray-800 flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 input outline-none"
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="btn btn-success"
      >
        {
          loading ? 'Sending...' :'Send'
        }
      </button>
    </div>
  );
};

export default MessageInput;
