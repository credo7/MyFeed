import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./posts.module.css";

const ProfilePosts = ({ posts }: any) => {
  const postsElements = useMemo(() => {
    return (
      <div className="flex flex-wrap">
        {posts.map((post: any, index: number) => {
          return (
            <div key={index} className={styles.square}>
              <img
                className="absolute w-full object-contain top-0"
                src={post.imageURL}
                alt="post"
              ></img>
            </div>
          );
        })}
      </div>
    );
  }, [posts]);

  return <>{postsElements}</>;
};

export default ProfilePosts;
