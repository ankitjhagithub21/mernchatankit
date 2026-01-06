import UserList from "./UserList";
import CurrentUser from "./CurrentUser";

const Sidebar = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>

    
       <div className="flex flex-col h-screen bg-base-200 w-80 p-2">
        <div className="h-10 flex items-center px-2">
          <h1 className="text-xl nfont-semibold">Chats</h1>  
        </div>
        <UserList />

        <CurrentUser />
      </div>
    
    </div>
  );
};

export default Sidebar;
