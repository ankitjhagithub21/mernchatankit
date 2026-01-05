import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ChatProvider } from "./context/ChatContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ChatProvider>
      <App />
    <Toaster />
    </ChatProvider>
    
  </AuthProvider>
);
