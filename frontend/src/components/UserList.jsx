import { useEffect, useState } from "react";
import api from "../services/api";
import UserItem from "./UserItem";
import { useChat } from "../context/ChatContext";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const {setSelectedChat} = useChat()
  useEffect(() => {
    api.get("/users").then((res) => {
      setUsers(res.data.users);
    });
  }, []);

  const handleUserClick = async (userId) => {
    const res = await api.post("/chat", { userId });
    setSelectedChat(res.data.chat);
  };

  return (
    <div className="space-y-2">
      {users.map((user) => (
        <UserItem key={user._id} fullname={user.fullname} onClick={() => handleUserClick(user._id)}/>
      ))}
    </div>
  );
};

export default UserList;
