import { useState } from "react";
import api from "../services/api";
import { useChat } from "../context/ChatContext";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { selectedChat } = useChat();

  const handleSend = async () => {
    if (!text.trim()) return;
    setText("");

    try {
      const res = await api.post(`/message`,{text,chatId:selectedChat._id})
      console.log(res.data)
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-3 border-t flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded-md px-3 py-2"
      />
      <button
        onClick={handleSend}
        className="bg-primary text-primary-foreground px-4 rounded-md"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
