import { useEffect, useState } from "react";
import api from "../services/api";
import UserItem from "./UserItem";
import { useChat } from "../context/ChatContext";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { setSelectedChat, setSelectedUser } = useChat();

  useEffect(() => {
    api.get("/users").then((res) => {
      setUsers(res.data.users);
    });
  }, []);

  const handleUserClick = async (user) => {
    const res = await api.post("/chat", { userId: user._id });
    setSelectedChat(res.data.chat);
    setSelectedUser(user);
  };

  return (
    <div className="flex-1 overflow-y-scroll">
      {users.map((user) => (
        <UserItem
          key={user._id}
          fullname={user.fullname}
          onClick={() => handleUserClick(user)}
          userId={user._id}
          avatar={user.avatar}
        />
      ))}

    </div>
  );
};

export default UserList;
