import { useChat } from "../context/ChatContext";
import { PanelRightOpen } from "lucide-react";
const ChatHeader = () => {
  const { selectedUser } = useChat();
  return (
    <nav className="navbar w-full bg-base-300 flex items-center justify-between">
      {
        selectedUser && <div className="px-4 flex items-center gap-2">
        <div className="w-10 rounded-full">
          <img src={selectedUser?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} className="rounded-full" alt="profile"/>
        </div>
        {selectedUser?.fullname}
      </div>
      }
      <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
        <PanelRightOpen />
      </label>
    </nav>
  );
};

export default ChatHeader;
