import { useState, useRef, useEffect } from "react";
import { useChat } from "../context/ChatContext";
import MessageItem from "./MessageItem";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import socket from "../socket/socket";

const MessageList = () => {
  const { selectedChat, messages, setMessages , selectedUser} = useChat();
  const { user } = useAuth();

  const bottomRef = useRef(null);

  useEffect(() => {
    if (!selectedChat?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await api.get(`/message/${selectedChat._id}`);
        setMessages(res.data.messages);
      } catch (error) {
        console.error("Failed to fetch messages");
      }
    };

    fetchMessages();
  }, [selectedChat]);

   useEffect(() => {
    socket.on("receive-message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => socket.off("receive-message");
  }, []);


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

  // 🌟 Empty state
  if (messages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground text-center px-4">
        <div>
          <p className="text-lg font-medium">
            Start your conversation with{" "}
            <span className="text-primary font-semibold">
              {selectedUser?.fullname || "this user"}
            </span>{" "}
            👋
          </p>
          <p className="text-sm mt-1">Say hello and break the ice!</p>
        </div>
      </div>
    );
  }


  console.log(messages)
  return (
    <div className="p-5 space-y-4">
      {messages.map((msg) => (
        <MessageItem
          key={msg._id}
          message={{
            avatar: "",
            text: msg.text,
            time: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            sender:
              msg.sender ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            isOwn: msg.sender._id === user._id,
          }}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
