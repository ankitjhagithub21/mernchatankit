import { useState, useRef, useEffect } from "react";
import { useChat } from "../context/ChatContext";
import MessageItem from "./MessageItem";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const MessageList = () => {

  const [messages, setMessages] = useState([])
  const {selectedChat} = useChat()
  const {user} = useAuth()
  
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!selectedChat?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await  api.get(`/message/${selectedChat._id}`);
        setMessages(res.data.messages);
      } catch (error) {
        console.error("Failed to fetch messages");
      }
    };

    fetchMessages();
  }, [selectedChat]);

  // auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!selectedChat) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Select a chat to start messaging
      </div>
    );
  }

  return (
   <div className="p-5 space-y-4">
      {messages.map((msg) => (
        <MessageItem
          key={msg._id}
          message={{
            avatar:"",
            text: msg.text,
            time: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            sender: msg.sender,
            isOwn: msg.sender._id === user._id, // fixed below
          }}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
