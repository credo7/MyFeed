import { BsThreeDots } from "react-icons/bs";
import { HiOutlinePaperAirplane } from "react-icons/Hi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { CgBookmark } from "react-icons/cg";
import { FaRegSmileWink } from "react-icons/fa";
import Comment from "./Comment";
import { useEffect, useState } from "react";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { useAuth } from "../../../Context/AuthContext";

const Post = ({ userImg, username, caption, imageURL, uid }: any) => {
  const { currentUser, userSecondaryInfo } = useAuth();

  const [likes, setLikes] = useState([] as any);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), where("uid", "==", uid)),
      (snapshot) => {
        const res = [] as any;
        if (snapshot?.docs[0]?.data()?.likes) {
          setLikes(snapshot?.docs[0]?.data()?.likes);
        }
      }
    );
  }, [db, uid]);

  useEffect(() => {
    if (likes.length > 0 && likes.includes(currentUser.uid)) {
      setIsLiked(true);
    }
  }, [currentUser, likes]);

  const like = async () => {
    setIsLiked(true);
    const postRef = query(collection(db, "posts"), where("uid", "==", uid));
    const postDocs = await getDocs(postRef);
    const postId = postDocs.docs[0].id;

    const likeRef = doc(db, "posts", postId);

    await updateDoc(likeRef, {
      likes: arrayUnion(currentUser.uid),
    });
  };

  const unlike = async () => {
    setIsLiked(false);
    const postRef = query(collection(db, "posts"), where("uid", "==", uid));
    const postDocs = await getDocs(postRef);
    const postId = postDocs.docs[0].id;

    const likeRef = doc(db, "posts", postId);

    await updateDoc(likeRef, {
      likes: arrayRemove(currentUser.uid),
    });
  };

  return (
    <div
      className="bg-white border border-gray-100 rounded-sm my-6 first:-my-[2px] sm:first:my-6
     border-x-0 sm:border-x-[1px]"
    >
      {/* Header */}
      <div className="flex flew-row w-full justify-between items-center px-5 my-3 sm:my-4">
        <div className="flex flex-row justify-center items-center space-x-4">
          <img className="w-10 h-10 rounded-full object-cover" src={userImg} />
          <p className="">{username}</p>
        </div>
        <BsThreeDots className="w-4 h-4 text-gray-500" />
      </div>

      {/* image */}
      <img className="" src={imageURL} />

      {/* buttons */}
      <div className="flex flex-row justify-between items-center px-4 pt-4 pb-2">
        <div className="flex flex-row items-center space-x-4">
          {isLiked ? (
            <AiFillHeart onClick={unlike} className="h-7 w-7 text-red-500" />
          ) : (
            <AiOutlineHeart onClick={like} className="h-7 w-7" />
          )}
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
        <p className="mb-1 font-medium text-sm">
          {likes.length} like{likes.length != 1 && "s"}
        </p>
      </div>

      {/* caption */}
      {/* <p>View all 259 comments</p> */}
      <div className="px-4">
        <p className="inline font-medium text-sm pr-2">{username}</p>
        <span className="inline text-sm ">{caption}</span>
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
        <input
          className="mx-4 w-full h-[40px] px-2 border-0 outline-none"
          placeholder="Add a comment"
        />
        <button className="text-lg font-medium text-blue-500">Post</button>
      </div>
    </div>
  );
};

export default Post;
