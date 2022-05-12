import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '../../../firebase';
import { useAuth } from '../../Context/AuthContext';
import Post from './Post';

const Posts = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([] as any);
  const [followings, setFollowings] = useState([] as any);

  // onSnapshot(
  //   query(collection(db, 'users'), where('uid', '==', currentUser.uid)),
  //   (snapshot) => {
  //     if (snapshot?.docs[0]?.data()?.followings) {
  //       setFollowings(snapshot?.docs[0]?.data()?.followings);
  //     }
  //   },
  // );

  useEffect(() => {
    const updateFollowings = async () => {
      const q = query(
        collection(db, 'users'),
        where('uid', '==', currentUser.uid),
      );
      const snapshot = await getDocs(q);
      if (snapshot?.docs[0]?.data()?.followings) {
        setFollowings(snapshot?.docs[0]?.data()?.followings);
      }
    };
    updateFollowings();
  }, []);

  //   //--------------
  // useEffect(()=>{
  //   if(posts){
  //     console.log(posts)
  //   }

  // },[posts])
  //   //--------------

  useEffect(() => {
    const updatePosts = async () => {
      const res = [] as any;

      const postsRef = collection(db, 'posts');
      if (followings?.length > 0) {
        const postsQ = query(
          postsRef,
          where('user_uid', 'in', followings),
          orderBy('timeStamp'),
        );
        const postsDocs = await getDocs(postsQ);

        await postsDocs?.docs?.forEach((doc) => {
          res.push(JSON.parse(JSON.stringify(doc?.data())));
        });
        setPosts(res.reverse());
      }
    };
    updatePosts();
  }, [followings]);

  return (
    <div>
      {posts.length < 1 && (
        <div className="w-full flex items-center justify-center my-4">
          <div className="w-full mx-4 sm:mx-0 rounded-[32px] bg-gray-200 py-2 px-2 flex items-center justify-center">
            <p>Подпишись на кого-нибудь и здесь будут посты</p>{' '}
          </div>
        </div>
      )}
      {posts.map((post: any, index: any) => (
        <Post
          key={index}
          username={post?.username}
          userImg={post?.profileImg}
          caption={post?.caption}
          imageURL={post?.imageURL}
          uid={post?.uid}
          date={post?.timeStamp}
        />
      ))}
    </div>
  );
};

export default Posts;
