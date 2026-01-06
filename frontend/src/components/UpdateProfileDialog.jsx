import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const UpdateProfileDialog = () => {
  const { user, setUser } = useAuth();

  const [fullname, setFullname] = useState(user?.fullname || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(user?.avatar || "");
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    if (!fullname.trim()) return;

    const formData = new FormData();
    formData.append("fullname", fullname);

    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    setLoading(true);
    try {
      const res = await api.put("/users/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(res.data.user);
      document.getElementById("my_modal_1").close();
    } catch (err) {
      console.error("Profile update failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Update Profile</h3>

        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full overflow-hidden border">
            <img
              src={
                preview ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <input
            type="file"
            accept="image/*"
            className="file-input file-input-sm"
            onChange={handleAvatarChange}
          />
        </div>

        {/* Fullname */}
        <div className="mt-4">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter full name"
          />
        </div>

        {/* Actions */}
        <div className="modal-action">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <form method="dialog">
            <button className="btn btn-ghost">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateProfileDialog;
