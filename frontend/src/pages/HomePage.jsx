import ChatHeader from "../components/ChatHeader";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import UserList from "../components/UserList";

const HomePage = () => {
  
  return (
    <div className="drawer lg:drawer-open h-screen">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      {/* MAIN CHAT AREA */}
      <div className="drawer-content flex flex-col h-screen overflow-hidden">
        <ChatHeader />

        {/* messages */}
        <div className="flex-1 overflow-y-auto">
          <MessageList />
        </div>

        {/* input */}
        <MessageInput />
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>

        <ul className="menu bg-base-200 min-h-full w-80 p-4 overflow-y-auto">
          <h1 className="text-xl mb-3 font-semibold">Chats</h1>

          <label className="input input-bordered mb-3 flex items-center gap-2">
            <input type="search" placeholder="Search" className="grow" />
          </label>

          <UserList />
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
