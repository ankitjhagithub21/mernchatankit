import UserList from "./UserList";
import CurrentUser from "./CurrentUser";

const Sidebar = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>

    
       <div className="flex flex-col h-screen bg-base-200 w-80 p-2">
        <div className="h-20">
          <h1 className="text-xl mb-1 nfont-semibold">Chats</h1>

          <label className="input outline-none flex items-center gap-2">
            <input type="search" placeholder="Search" className="grow" />
          </label>
        </div>
        <UserList />

        <CurrentUser />
      </div>
    
    </div>
  );
};

export default Sidebar;
