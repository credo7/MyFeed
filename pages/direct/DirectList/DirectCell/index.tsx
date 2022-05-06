interface DirectCellProps {
  username: string;
  lastMsg: string;
  timeStamp: string;
  unreadMsgCount: number;
}

export default function DirectCell({
  username,
  lastMsg,
  timeStamp,
  unreadMsgCount,
}: DirectCellProps) {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="h-60px flex flex-row items-center px-5 space-x-4 my-2">
        <img className="h-12 w-12 rounded-full" src="https://fakeimg.pl/300/" />
        <div className="">
          <div className="">{username}</div>
          <div className="text-gray-500 text-sm">{lastMsg}</div>
        </div>
      </div>
      <div className="pr-4">
        {unreadMsgCount > 0 ? (
          <div className="bg-red-500 w-[20px] h-[20px] flex justify-center items-center rounded-full">
            <p className="text-xs text-white">{unreadMsgCount}</p>
          </div>
        ) : (
          <p className="text-xs font-light text-gray-500">{timeStamp}</p>
        )}
      </div>
    </div>
  );
}
