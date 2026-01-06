import { useChat } from "../context/ChatContext";

const UserItem = ({ fullname, onClick, userId , avatar}) => {
  const { selectedUser, onlineUsers } = useChat();

  const isOnline = onlineUsers.includes(userId);

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted
        ${selectedUser?._id === userId ? "border border-gray-600" : ""}
      `}
    >
      <div className="relative">
        {
          avatar  ? <img src={avatar} alt={"U"} className="w-10 h-10 rounded-full object-cover object-center" /> : <div className="bg-neutral text-neutral-content w-10 h-10 rounded-full flex items-center justify-center">
          <span className="text-xl">{fullname[0]}</span>
        </div>
        }

        {/* Online indicator */}
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background
            ${isOnline ? "bg-green-500" : "bg-gray-400"}
          `}
        />
      </div>

      <div>
        <p className="font-medium">{fullname}</p>
        <p className="text-sm text-muted-foreground">
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default UserItem;
