import UserList from "./UserList";
import CurrentUser from "./CurrentUser";

const Sidebar = () => {
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-3" className="drawer-overlay"></label>

      <ul className="menu bg-base-200 min-h-full w-80 p-4 overflow-y-auto flex flex-col">
        <div>
          <h1 className="text-xl mb-3 font-semibold">Chats</h1>

          <label className="input input-bordered mb-3 flex items-center gap-2">
            <input type="search" placeholder="Search" className="grow" />
          </label>
        </div>
        <UserList />

        <CurrentUser />
      </ul>
    </div>
  );
};

export default Sidebar;
