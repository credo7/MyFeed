const Comment = ({ username, caption }: any) => {
  return (
    <div className="flex flex-row px-4 space-x-1 items-end">
      <p className="text-sm font-medium">{username}</p>
      <p className="text-sm truncate">{caption}</p>
    </div>
  );
};

export default Comment;
