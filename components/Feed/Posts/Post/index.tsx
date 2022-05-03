import { BsThreeDots } from "react-icons/bs";
import { HiOutlinePaperAirplane } from "react-icons/Hi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { CgBookmark } from "react-icons/cg";
import { FaRegSmileWink } from "react-icons/fa"; // TODO можно вынести такие компоненты
import { RiArrowUpLine, RiArrowDownLine } from "react-icons/ri";
import Comment from "./Comment";
import { useEffect, useRef, useState } from "react";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import { useAuth } from "../../../Context/AuthContext";
import Moment from "react-moment";

const Post = ({ userImg, username, caption, imageURL, uid, date }: any) => {
  const { currentUser, userSecondaryInfo } = useAuth();
  const [timeStamp, setTimeStamp] = useState() as any;
  const [likes, setLikes] = useState([] as any);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([] as any);
  const commentInputRef = useRef() as any;

  //Getting likes
  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), where("uid", "==", uid)),
      (snapshot) => {
        if (snapshot?.docs[0]?.data()?.likes) {
          setLikes(snapshot?.docs[0]?.data()?.likes);
        }
      }
    );
  }, [db, uid]);

  useEffect(() => {
    const time = new Date(date.seconds * 1000 + date.nanoseconds / 100000);
    setTimeStamp(time);
  }, [db, uid]);

  //Getting comments
  useEffect(() => {
    onSnapshot(
      query(collection(db, "posts"), where("uid", "==", uid)),
      (snapshot) => {
        if (snapshot?.docs[0]?.data()?.comments) {
          setComments(snapshot?.docs[0]?.data()?.comments.reverse());
        }
      }
    );
  }, [db, uid]);

  useEffect(() => {
    if (likes.length > 0 && likes.includes(currentUser.uid)) {
      setIsLiked(true);
    }
  }, [likes]);

  const addComment = async () => {
    const commentsRef = query(collection(db, "posts"), where("uid", "==", uid));
    const commentsDocs = await getDocs(commentsRef);
    const postId = commentsDocs.docs[0].id;
    const commentRef = doc(db, "posts", postId);

    if (commentInputRef.current.value > "") {
      updateDoc(commentRef, {
        comments: arrayUnion({
          username: userSecondaryInfo.username,
          caption: commentInputRef.current.value,
          timeStamp: Date.now(),
        }),
      });

      commentInputRef.current.value = "";
    }
  };

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
      className="bg-white border border-gray-50 rounded-[32px] my-6 first:-my-[2px] sm:first:my-6
     border-x-0 sm:border-x-[1px] shadow-sm"
    >
      {/* Header */}
      <div className="flex flew-row w-full justify-between items-center px-5 my-3 sm:my-4">
        <div className="flex flex-row justify-center items-center space-x-4">
          <img className="w-10 h-10 rounded-full object-cover" src={userImg} />
          <div className="flex flex-col">
            <p className="">{username}</p>
            <p className="text-gray-400 font-light text-xs truncate">
              <Moment fromNow>{timeStamp}</Moment>
            </p>
          </div>
        </div>
        <BsThreeDots className="w-4 h-4 text-gray-500" />
      </div>

      {/* image */}
      <img className="" src={imageURL} />

      {/* buttons */}
      <div className="flex flex-row justify-between items-center px-4 pt-4 pb-2">
        {/* <div className="flex flex-row items-center space-x-2">
          {isLiked ? (
            <AiFillHeart onClick={unlike} className="h-7 w-7 text-red-500" />
          ) : (
            <AiOutlineHeart onClick={like} className="h-7 w-7" />
          )}
          <p className="font-medium text-sm">
            {likes.length} like{likes.length != 1 && "s"}
          </p> */}
        {/* <FaRegComment className="h-6 w-6" /> */}
        {/* </div> */}
        <div className="flex flex-row space-x-2 items-center">
          <div className="flex flex-row items-center space-x-2 rounded-[32px] bg-slate-50 px-2 py-1">
            <RiArrowDownLine className="w-5 h-5" />
            <p className="font-medium text-md">{likes.length}</p>
            <RiArrowUpLine className="w-5 h-5" />
          </div>
          <FaRegComment className="h-6 w-6" />
        </div>
        <HiOutlinePaperAirplane className="rotate-45 h-6 w-6 relative bottom-1" />
      </div>

      {/* likes */}
      {/* <div className="flex flex-col px-4"> */}
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
      {/* <p className="mb-1 font-medium text-sm">
          {likes.length} like{likes.length != 1 && "s"}
        </p>
      </div> */}

      {/* caption */}
      {/* <p>View all 259 comments</p> */}
      <div className="px-4 flex flex-row items-center justify-between">
        <div>
          <p className="inline font-medium text-sm pr-2">{username}</p>
          <span className="inline text-sm ">{caption}</span>
        </div>
      </div>

      {/* comments */}
      {/* <p className="px-4 text-gray-400">View all 140 comments</p> */}
      <div className="flex flex-col max-h-12 overflow-y-scroll space-y-[2px]">
        {comments.map((comment: any, index: any) => {
          return (
            <Comment
              key={index}
              username={comment.username}
              caption={comment.caption}
              date={comment.timeStamp}
            />
          );
        })}
      </div>

      {/* date */}
      {/* <div className="px-4 text-gray-400 font-light text-sm truncate"> */}
      {/* </div> */}
      {/* comment input */}
      <div className="mt-2 bg-slate-50 rounded-b-[32px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addComment();
          }}
          className="flex flex-row px-4 py-[2px] justify-between items-center"
        >
          {/* <FaRegSmileWink className=" w-8 h-8" /> */}
          <input
            ref={commentInputRef}
            className="mx-4 w-full h-[40px] px-2 border-0 outline-none bg-transparent"
            placeholder="Add a comment"
          />
          <button
            type="submit"
            className="text-lg font-medium text-blue-500 mx-4"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
