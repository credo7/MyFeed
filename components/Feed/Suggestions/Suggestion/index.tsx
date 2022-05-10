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
import { useEffect, useState } from 'react';
import { FaUserCheck } from 'react-icons/fa';
import { uid } from 'uid';

import { db } from '../../../../firebase';
import { useAuth } from '../../../Context/AuthContext';

const Suggestion = ({ userImg, username, bio }: any) => {
  const { currentUser, userSecondaryInfo } = useAuth();
  const [suggestedProfile, setSuggestedProfile] = useState() as any;
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    const getSuggestedProfileInfo = async () => {
      const q = query(
        collection(db, 'users'),
        where('username', '==', username),
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot?.docs[0]?.data();
      if (data) {
        setSuggestedProfile(JSON.parse(JSON.stringify(data)));
      }
    };

    getSuggestedProfileInfo();
  }, []);

  useEffect(() => {
    console.log(userSecondaryInfo?.following);

    if (userSecondaryInfo?.followings?.includes(suggestedProfile?.uid)) {
      setIsFollow(true);
    }
  }, [suggestedProfile]);

  const follow = async () => {
    const userRef = doc(db, 'users', currentUser.uid);
    updateDoc(userRef, {
      followings: arrayUnion(suggestedProfile?.uid),
    });
    setIsFollow(true);
  };

  const unfollow = async () => {
    const userRef = doc(db, 'users', currentUser.uid);
    updateDoc(userRef, {
      followings: arrayRemove(suggestedProfile?.uid),
    });
    setIsFollow(false);
  };

  return (
    <div className="flex flex-row justify-between pl-4 items-center">
      <div className="flex flex-row space-x-4 items-center">
        <img className="w-8 h-8 rounded-full" src={userImg} />
        <div className="flex flex-col items-start">
          <p className="text-sm font-medium">{username}</p>
          <span className="text-xs text-gray-500 truncate w-[180px]">
            {bio}
          </span>
        </div>
      </div>
      {isFollow ? (
        <FaUserCheck onClick={unfollow} />
      ) : (
        <button onClick={follow} className=" text-blue-500 text-xs font-medium">
          Follow
        </button>
      )}
    </div>
  );
};

export default Suggestion;
