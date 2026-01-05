import { useState } from "react";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    console.log("Send:", message);
    setMessage("");
  };

  return (
    <form
      onSubmit={sendMessage}
      className="p-2  flex gap-2 bg-base-300"
    >
      <input
        type="text"
        placeholder="Type a message..."
        className="input outline-none w-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btn btn-primary">Send</button>
    </form>
  );
};

export default MessageInput;
