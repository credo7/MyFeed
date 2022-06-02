import { useMemo } from 'react';
import { IPost } from '../../../compiler/types';

import styles from './posts.module.css';

const ProfilePosts = ({ posts }: { posts:IPost[] }) => {
  const postsElements = useMemo(() => {
    return (
      <div className="flex flex-wrap">
        {posts.map((post: IPost, index: number) => {
          return (
            <div key={index} className={styles.square}>
              <img
                className="absolute w-full aspect-square object-cover top-0"
                src={post.imageURL}
                alt="post"
              />
            </div>
          );
        })}
      </div>
    );
  }, [posts]);

  return <>{postsElements}</>;
};

export default ProfilePosts;
