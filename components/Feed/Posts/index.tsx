import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { uid } from 'uid';

import { db } from '../../../firebase';
import { useAuth } from '../../Context/AuthContext';
import Post from './Post';

const Posts = () => {
  const { currentUser } = useAuth();
  const [ posts, setPosts ] = useState([] as any);
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
