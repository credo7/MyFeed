import { BsThreeDots } from "react-icons/bs";
import { HiOutlinePaperAirplane } from "react-icons/Hi";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { CgBookmark } from "react-icons/cg";
import { FaRegSmileWink } from "react-icons/fa";
import Comment from "./Comment";

const Post = ({ id, userImg, username, caption }: any) => {
  return (
    <div
      key={id}
      className="bg-white border border-gray-100 rounded-sm my-6 first:-my-[2px] sm:first:my-6
     border-x-0 sm:border-x-[1px]"
    >
      {/* Header */}
      <div className="flex flew-row w-full justify-between items-center px-5 my-3 sm:my-4">
        <div className="flex flex-row justify-center items-center space-x-4">
          <img className="w-10 rounded-full" src="https://i.pravatar.cc" />
          <p className="">{username}</p>
        </div>
        <BsThreeDots className="w-4 h-4 text-gray-500" />
      </div>

      {/* image */}
      <img className="" src={userImg} />

      {/* buttons */}
      <div className="flex flex-row justify-between items-center px-4 pt-4 pb-2">
        <div className="flex flex-row items-center space-x-4">
          <AiOutlineHeart className="h-7 w-7" />
          <FaRegComment className="h-6 w-6" />
          <HiOutlinePaperAirplane className="rotate-45 h-6 w-6 relative bottom-1" />
        </div>
        <CgBookmark className="w-6 h-6" />
      </div>

      {/* likes */}
      <div className="flex flex-col px-4">
        {/* <div className="flex flex-row -space-x-2">
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
        </div> */}
        <p className="mb-1 font-medium text-sm">2,329 likes</p>
      </div>

      {/* caption */}
      {/* <p>View all 259 comments</p> */}
      <div className="px-4">
        <p className="inline font-medium text-sm pr-2">{username}</p>
        <span className="inline text-sm ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias eos
          magnam laboriosam error. Placeat laudantium architecto ex earum
          consequuntur non vel iusto facilis minima dolorum.
        </span>
      </div>

      {/* comments */}
      <p className="px-4 text-gray-400">View all 140 comments</p>
      <div className="flex flex-col">
        <Comment username="bandrw" caption="BornToCode" />
        <Comment username="She" caption="I love you too! My BornToCoder!!!" />
      </div>

      {/* date */}
      <div className="px-4 text-gray-400 font-light text-sm truncate">
        <p>11 november 2020</p>
      </div>
      {/* comment input */}
      <div className="flex flex-row px-4 pb-2 pt-[1px] justify-between items-center">
        <FaRegSmileWink className=" w-8 h-8" />
        <input className="mx-4 w-full h-[40px] px-2 border-0 outline-none" placeholder="Add a comment" />
        <button className="text-lg font-medium text-blue-500">Post</button>
      </div>
    </div>
  );
};

export default Post;
