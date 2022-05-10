import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { CgMathPlus } from 'react-icons/cg';

import { db } from '../../../firebase';
import { useAuth } from '../../Context/AuthContext';
import Story from './Story';

const Stories = () => {
  const [stories, setStories] = useState([] as any);
  const { currentUser } = useAuth();

  useEffect(() => {
    const updateStories = async () => {
      const res = [] as any;
      const userRef = collection(db, 'users');
      const q = query(userRef, where('uid', '==', currentUser.uid));
      const userDocs = await getDocs(q);

      const followings = userDocs?.docs[0]?.data()?.followings;

      if (followings?.length > 0) {
        const storiesRef = collection(db, 'stories');
        const storiesQ = query(
          storiesRef,
          where('user_uid', 'in', followings),
          orderBy('timeStamp'),
        );

        const storiesDocs = await getDocs(storiesQ);

        await storiesDocs.docs.forEach((doc) => {
          res.push(JSON.parse(JSON.stringify(doc?.data())));
        });
        setStories(res.reverse());
      }
    };
    updateStories();
  }, [currentUser]);

  return (
    <div
      className="flex space-x-4 px-5 py-2 sm:py-4 my-2 sm:my-0 sm:bg-white overflow-x-scroll 
    scrollbar-hide sm:border-y sm:border-x sm:border-gray-50 sm:rounded-[32px] sm:shadow-sm min-h-[118px] border-b-[1px] border-b-gray-100"
    >
      <div
        className="h-[64px] w-[64px]  
      cursor-pointer hover:scale-110 transition 
      transform duration-200 ease-out"
      >
        <div
          className="flex items-center justify-center h-[64px] w-[64px]  
      cursor-pointer hover:scale-110 transition 
      transform duration-200 ease-out border-2 border-[#eee] rounded-[20px]"
        >
          <CgMathPlus className="w-7 h-7 text-gray-800" />
        </div>
        <p className="mt-[4px] text-xs w-16 truncate text-center ">Add story</p>
      </div>
      {stories.map((story: any, index: any) => (
        <Story key={index} img={story.avatar} username={story.username} />
      ))}
    </div>
  );
};

export default Stories;
