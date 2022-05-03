import { useEffect, useState } from "react";
import Moment from "react-moment";

const Comment = ({ username, caption, date }: any) => {
  const [timeStamp, setTimeStamp] = useState() as any;
  useEffect(() => {
    const time = new Date(date.seconds * 1000 + date.nanoseconds / 100000);
    setTimeStamp(time);
  }, [date]);

  return (
    <div className="flex flex-row px-4 space-x-1 items-end justify-between">
      <div className="flex flex-row space-x-1">
      <p className="text-sm font-medium">{username}</p>
      <span className="text-sm truncate">{caption}</span>
      </div>
      <p className="text-sm text-gray-400">{date ? <Moment fromNow>{date}</Moment> : <></>}</p>
    </div>
  );
};

export default Comment;
