import { useEffect } from "react";
import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import Sidebar from "../components/Sidebar";
import { useChat } from "../context/ChatContext";
import socket from "../socket/socket";
import { useAuth } from "../context/AuthContext";
import UpdateProfileDialog from "../components/UpdateProfileDialog";

const HomePage = () => {
  const { selectedChat } = useChat();
  const {user} = useAuth()

  useEffect(() => {
    if (!selectedChat) return;
    socket.emit("join-chat", selectedChat._id);
    return () => {
      socket.off("receive-message");
    };
  }, [selectedChat]);

  useEffect(() => {
    if (!user?._id) return;

    socket.emit("user-online", user._id);
  }, [user]);


  return (
    <div className="drawer lg:drawer-open h-screen">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      {/* MAIN CHAT AREA */}
      <div className="drawer-content flex flex-col h-screen">
        <ChatHeader />

        {/* messages */}
        <div className="flex-1 overflow-y-auto">
          <MessageList />
        </div>

        {/* input */}
        <MessageInput />
      </div>

      {/* SIDEBAR */}
      <Sidebar />

      <UpdateProfileDialog/>
    </div>
  );
};

export default HomePage;
