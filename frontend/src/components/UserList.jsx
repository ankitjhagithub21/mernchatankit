import { useEffect, useState } from "react";
import api from "../services/api";
import UserItem from "./UserItem";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then((res) => {
      setUsers(res.data.users);
    });
  }, []);

  return (
    <div className="space-y-2">
      {users.map((user) => (
        <UserItem key={user._id} fullname={user.fullname}/>
      ))}
    </div>
  );
};

export default UserList;
