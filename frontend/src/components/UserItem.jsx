const UserItem = ({ fullname, onClick }) => {
  return (
    <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted" onClick={onClick}>
      <div className="avatar avatar-online avatar-placeholder">
        <div className="bg-neutral text-neutral-content w-10 rounded-full">
          <span className="text-xl">{fullname[0]}</span>
        </div>
      </div>
      <div>
        <p className="font-medium">{fullname}</p>
        <p className="text-sm text-muted-foreground">Start chatting</p>
      </div>
    </div>
  );
};

export default UserItem;
