import { io } from "socket.io-client";

const origin = `${import.meta.env.VITE_SERVER_URL}` || "http://localhost:5173"

const socket = io(origin, {
  withCredentials: true,
});

export default socket;
