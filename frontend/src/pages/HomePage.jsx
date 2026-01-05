import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  
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
     <Sidebar/>
    </div>
  );
};

export default HomePage;
