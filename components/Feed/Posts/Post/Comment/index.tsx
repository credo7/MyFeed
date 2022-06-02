import Moment from 'react-moment';
import { IComment } from '../../../../../compiler/types';

const Comment = ({ username, caption, timeStamp }: IComment) => {
  return (
    <div className="flex flex-row pr-4 space-x-1 items-end justify-between">
      <div className="flex flex-row space-x-1">
        <p className="text-sm font-medium">{username}</p>
        <span className="text-sm truncate">{caption}</span>
      </div>
      <p className="text-sm text-gray-400">
        {timeStamp ? <Moment fromNow>{timeStamp}</Moment> : <></>}
      </p>
    </div>
  );
};

export default Comment;
