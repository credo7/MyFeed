import { BsThreeDots } from "react-icons/bs";
import { HiOutlinePaperAirplane } from "react-icons/Hi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { CgBookmark } from "react-icons/cg";

const Post = ({ id, userImg, username, caption }: any) => {
  return (
    <div>
      {/* Header */}
      <div className="flex flew-row w-full justify-between items-center px-5 my-4">
        <div className="flex flex-row justify-center items-center space-x-4">
          <img className="w-10 rounded-full" src="https://i.pravatar.cc" />
          <p className="">{username}</p>
        </div>
        <BsThreeDots className="w-4 h-4 text-gray-500" />
      </div>

      {/* image */}
      <img className="" src={userImg} />

      {/* buttons */}
      <div className="flex flex-row justify-between items-center px-4 py-4">
        <div className="flex flex-row items-center space-x-4">
          <AiOutlineHeart className="h-7 w-7" />
          <FaRegComment className="h-6 w-6" />
          <HiOutlinePaperAirplane className="rotate-45 h-6 w-6 relative bottom-1" />
        </div>
        <CgBookmark className="w-6 h-6" />
      </div>

      {/* likes */}
      <div className="flex flex-row px-4 space-x-2">
        <div className="flex flex-row -space-x-2">
          <img
            className="w-6 h-6 rounded-full border-2 border-white z-30"
            src={userImg}
          />
          <img
            className="w-6 h-6 rounded-full border-2 border-white z-20"
            src={userImg}
          />
          <img
            className="w-6 h-6 rounded-full border-2 border-white z-10"
            src={userImg}
          />
        </div>
        <p>Liked by bandrrw</p>
      </div>

      {/* caption */}

      <div className="flex flex-row px-4 space-x-1 items-end">
        <p className=" font-medium">{username}</p>
        <p className="truncate">{caption + caption + caption + caption}</p>
      </div>

      {/* comments */}
      <div className="flex flex-col">
        <div className="flex flex-row px-4 space-x-1 items-end">
          <p className=" font-medium">bandrrw</p>
          <p className="truncate">Love her</p>
        </div>
        <div className="flex flex-row px-4 space-x-1 items-end">
          <p className="font-medium">She</p>
          <p className="truncate">I love you too! My BornToCoder!!!</p>
        </div>
      </div>

      {/* date */}
      <div className="px-4 text-gray-400 font-light text-sm truncate">
        <p>11 november 2020</p>
      </div>
    </div>
  );
};

export default Post;
