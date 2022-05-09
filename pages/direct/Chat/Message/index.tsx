export default function message({
  isLast,
  text,
  timeStamp,
  owner,
}: {
  text: string;
  timeStamp: string;
  owner: boolean;
  isLast: boolean;
}) {
  return owner ? (
    <MineMessage isLast={isLast} text={text} timeStamp={timeStamp} />
  ) : (
    <YourMessage isLast={isLast} text={text} timeStamp={timeStamp} />
  );
}

export function YourMessage({
  isLast,
  text,
  timeStamp,
}: {
  isLast: boolean;
  text: string;
  timeStamp: string;
}) {
  return (
    <div className="flex flex-row space-x-3">
      <div
        className={`bg-[#eee] px-4 py-2 rounded-[24px] max-w-[80%] ml-4 relative ${
          isLast && 'message_last_left'
        }`}
      >
        <span className="">{text}</span>
      </div>
      <p className="mt-auto text-right text-xs text-gray-500">{timeStamp}</p>
    </div>
  );
}

export function MineMessage({
  isLast,
  text,
  timeStamp,
}: {
  isLast: boolean;
  text: string;
  timeStamp: string;
}) {
  return (
    <div className="flex flex-row space-x-3 w-full justify-end pr-4">
      <p className="mt-auto ml-3 text-right text-xs text-gray-500">
        {timeStamp}
      </p>
      <div
        className={`bg-[#2591ff] text-white mr-4 px-4 py-2 rounded-[24px] max-w-[80%] mt-2 relative ${
          isLast && 'message_last_right'
        }`}
      >
        <span className="">{text}</span>
      </div>
    </div>
  );
}
