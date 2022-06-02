import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { now } from 'moment';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { HiOutlinePaperAirplane } from 'react-icons/hi';
import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';
import Moment from 'react-moment';
import { IComment, ILike, IPost } from '../../../../compiler/types';

import { db } from '../../../../firebase';
import { useAuth } from '../../../Context/AuthContext';
import Comment from './Comment';

const Post = ({ profileImg, username, caption, imageURL, uid, timeStamp }: IPost) => {
  const { currentUser, userSecondaryInfo } = useAuth();
  const [likes, setLikes] = useState([] as ILike[]);
  const [voteCout, setVoteCount] = useState(0);
  const [currentVote, setCurrentVote] = useState(0);
  const [comments, setComments] = useState([] as IComment[]);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const goToProfilePage = () => {
    router.push(`${process.env.BASE_PATH}/${username}`);
  };

  const time = new Date(timeStamp.seconds * 1000 + timeStamp.nanoseconds / 100000);

  //Getting likes
  useEffect(() => {
    const getLikes = async () => {
      const q = query(collection(db, 'posts'), where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const likes = querySnapshot?.docs[0]?.data()?.likes;
      if (likes) {
        setLikes(likes);
      }
    };
    getLikes();
  }, []);

  //Getting comments
  useEffect(() => {
    const getComments = async () => {
      const q = query(collection(db, 'posts'), where('uid', '==', uid));
      const querySnapshot = await getDocs(q);
      const comments = querySnapshot?.docs[0]?.data()?.comments;
      if (comments) {
        setComments(comments.reverse());
      }
    };
    getComments();
  }, []);

  const addComment = async () => {
    if (commentInputRef.current?.value && commentInputRef.current.value > '') {
      setComments([
        ...comments,
        {
          username: userSecondaryInfo.username,
          caption: commentInputRef.current.value,
          timeStamp: now(),
        },
      ]);
    }
    const commentsRef = query(collection(db, 'posts'), where('uid', '==', uid));
    const commentsDocs = await getDocs(commentsRef);
    const postId = commentsDocs.docs[0].id;
    const commentRef = doc(db, 'posts', postId);

    if (commentInputRef.current?.value && commentInputRef.current.value > '') {
      updateDoc(commentRef, {
        comments: arrayUnion({
          username: userSecondaryInfo.username,
          caption: commentInputRef.current.value,
          timeStamp: Date.now(),
        }),
      });

      commentInputRef.current.value = '';
    }
  };

  useEffect(() => {
    const currentUserLike = JSON.parse(JSON.stringify(likes || '')).filter(
      (like: { mark: number; uid: string }) => like.uid == currentUser.uid,
    );
    if (currentUserLike.length > 0) {
      setCurrentVote(currentUserLike[0].mark);
    }
  }, [likes]);

  useEffect(() => {
    if (likes != undefined) {
      let count = 0;
      likes.forEach((like: ILike) => {
        count += like.mark;
      });
      setVoteCount(count);
    }
  }, [likes]);

  const changeVote = async (vote: number) => {
    setCurrentVote(vote);

    if (vote == currentVote) {
      setVoteCount(voteCout - vote);
    } else {
      setVoteCount(voteCout - currentVote + vote);
    }

    const postRef = query(collection(db, 'posts'), where('uid', '==', uid));
    const postDocs = await getDocs(postRef);
    const postId = postDocs.docs[0].id;

    const likeRef = doc(db, 'posts', postId);

    const filteredLikes = likes.filter(
      (like: ILike) => like.uid != currentUser.uid,
    );

    if (vote == currentVote) {
      setCurrentVote(0);

      await updateDoc(likeRef, {
        likes: [...filteredLikes],
      });

      setLikes([...filteredLikes]);
    } else {
      setCurrentVote(vote);
      await updateDoc(likeRef, {
        likes: [...filteredLikes, { uid: currentUser.uid, mark: vote }],
      });

      setLikes([...filteredLikes, { uid: currentUser.uid, mark: vote }]);
    }
  };

  return (
    <div
      className="sm:bg-white sm:border border-gray-50 rounded-b-[32px] sm:rounded-[32px] my-6 first:-my-[2px] sm:first:my-6
     border-x-0 sm:border-x-[1px] sm:shadow-sm"
    >
      {/* Header */}
      <div className="flex flex-col">
        <div className="flex flew-row w-full justify-between items-center px-5 my-3 sm:my-4">
          <div className="flex flex-row justify-center items-center space-x-4">
            <img
              onClick={goToProfilePage}
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              src={profileImg}
            />
            <div className="flex flex-col">
              <p className="">{username}</p>
              <p className="text-gray-400 font-light text-xs truncate">
                <Moment fromNow>{time}</Moment>
              </p>
            </div>
          </div>
          <BsThreeDots className="w-4 h-4 text-gray-500" />
        </div>

        {/* image */}
        <img className=" aspect-square object-cover" src={imageURL} />

        {/* buttons */}
        <div className="flex flex-row my-2">
          <div className="flex flex-col items-center space-x-0 space-y-1 h-full  text-gray-800 px-2 py-0 mx-1 mr-3 border-r-[1px] border-r-gray-200 my-auto ">
            <RiArrowUpLine
              onClick={() => changeVote(1)}
              className={
                'w-6 h-6 hover:scale-110 ' +
                (currentVote == 1 ? 'text-red-500' : 'text-gray-800')
              }
            />
            <p className="font-medium text-md min-w-[3ch] text-center bg-gray-200 rounded-md text-gray-800 p-[2px] shadow-sm border-[1px]">
              {voteCout}
            </p>
            <RiArrowDownLine
              onClick={() => changeVote(-1)}
              className={
                'w-6 h-6 hover:scale-110 ' +
                (currentVote == -1 ? 'text-red-500' : 'text-gray-800')
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between items-center pr-4 pt-4 pb-2">
              <FaRegComment className="hover:scale-110 h-6 w-6" />
              <HiOutlinePaperAirplane className="hover:scale-110 rotate-45 h-6 w-6 relative bottom-1" />
            </div>

            <div className="pr-4 flex flex-row items-center justify-between">
              <div>
                <p className="inline font-medium text-sm pr-2">{username}</p>
                <span className="inline text-sm ">{caption}</span>
              </div>
            </div>

            {/* comments */}
            <div className="flex flex-col max-h-12 overflow-y-scroll space-y-[2px] pb-[8px]">
              {comments.map((comment: IComment, index: number) => {
                return (
                  <Comment
                    key={index}
                    username={comment.username}
                    caption={comment.caption}
                    timeStamp={comment.timeStamp}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className=" sm:bg-gray-50 sm:rounded-b-[32px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addComment();
            }}
            className="flex flex-row px-4 py-[2px] justify-between items-center"
          >
            <input
              ref={commentInputRef}
              className="sm:mx-4 w-full h-[40px] text-[16px] sm:px-2 border-0 outline-none bg-transparent"
              placeholder="Add a comment"
            />
            <button
              type="submit"
              className={
                'text-lg font-normal text-gray-800 px-3 bg-gray-100 shadow-sm border-[1px]  rounded-[32px] sm:mx-4 hover:scale-110'
              }
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Post;
