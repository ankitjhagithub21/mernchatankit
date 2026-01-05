import { useEffect, useState } from "react";
import api from "../services/api";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then((res) => {
      setUsers(res.data.users);
    });
  }, []);

  return (
    <div className="p-3 space-y-2">
      {users.map((user) => (
        <div
          key={user._id}
          className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted"
        >
          <div className="w-10 h-10 bg-gray-300 rounded-full" />
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">
              Start chatting
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
