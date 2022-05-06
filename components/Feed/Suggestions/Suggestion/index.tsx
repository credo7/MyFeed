const Suggestion = ({ userImg, username, caption }: any) => {
  return (
    <div className="flex flex-row justify-between pl-4">
      <div className="flex flex-row space-x-4 items-center">
        <img className="w-8 h-8 rounded-full" src={userImg} />
        <div className="flex flex-col items-start">
          <p className="text-sm font-medium">{username}</p>
          <p className="text-xs text-gray-500">{caption}</p>
        </div>
      </div>
      <button className=" text-blue-500 text-xs font-medium">Follow</button>
    </div>
  );
};

export default Suggestion;
