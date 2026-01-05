import { LogOut } from "lucide-react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const CurrentUser = () => {
  const { user , setUser} = useAuth();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null)
      toast.success("Logout successfull.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="border-t p-3 flex items-center justify-between">
      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-semibold">
          {user.fullname[0]}
        </div>
        <div className="leading-tight">
          <p className="font-medium text-sm">{user.fullname}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground"
        title="Logout"
      >
        <LogOut size={18} />
      </button>
    </div>
  );
};

export default CurrentUser;
