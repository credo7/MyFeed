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

  onSnapshot(
    query(collection(db, 'users'), where('uid', '==', currentUser.uid)),
    (snapshot) => {
      if (snapshot?.docs[0]?.data()?.followings) {
        setFollowings(snapshot?.docs[0]?.data()?.followings);
      }
    },
  );

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

        await postsDocs.docs.forEach((doc) => {
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
        <div className="w-full flex items-center justify-center my-4 rounded-[32px] bg-gray-200 py-2">
          <p>Подпишись на кого-нибудь и здесь будут посты :)</p>{' '}
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
