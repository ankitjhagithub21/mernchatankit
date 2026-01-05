import MessageItem from "./MessageItem";

const MessageList = () => {
  // TEMP data (later from API)
  const messages = [
    {
      _id: 1,
      sender: {
        name: "Obi-Wan Kenobi",
        avatar:
          "https://img.daisyui.com/images/profile/demo/kenobee@192.webp",
      },
      text: "You were the Chosen One!",
      time: "12:45",
      isOwn: false,
    },
    {
      _id: 2,
      sender: {
        name: "You",
      },
      text: "I hate you!",
      time: "12:46",
      isOwn: true,
    },
  ];

  return (
    <div className="p-5 space-y-4">
      {messages.map((msg) => (
        <MessageItem key={msg._id} message={msg} />
      ))}
    </div>
  );
};

export default MessageList;
