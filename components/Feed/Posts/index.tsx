import {
  collection,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { useAuth } from "../../Context/AuthContext";
import Post from "./Post";

const Posts = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([] as any);

  useEffect(() => {
    const updatePosts = async () => {
      const res = [] as any;
      const userRef = collection(db, "users");
      const q = query(userRef, where("uid", "==", currentUser.uid));
      const userDocs = await getDocs(q);

      const followings = userDocs?.docs[0]?.data()?.followings;

      const postsRef = collection(db, "posts");
      const postsQ = query(
        postsRef,
        where("user_uid", "in", followings),
        orderBy("timeStamp")
      );
      const postsDocs = await getDocs(postsQ);

      await postsDocs.docs.forEach((doc) => {
        res.push(JSON.parse(JSON.stringify(doc?.data())));
      });
      setPosts(res.reverse());
      console.log(res);
    };
    updatePosts();
  }, []);

  // const posts = [
  //   {
  //     id: 1,
  //     username: "Credo",
  //     userImg: "https://i.pravatar.cc",
  //     caption: "Monkey!",
  //   },
  //   {
  //     id: 2,
  //     username: "Credo",
  //     userImg: "https://i.pravatar.cc",
  //     caption: "Monkey!",
  //   },
  //   {
  //     id: 3,
  //     username: "Credo",
  //     userImg: "https://i.pravatar.cc",
  //     caption: "Monkey!",
  //   },
  //   {
  //     id: 4,
  //     username: "Credo",
  //     userImg: "https://i.pravatar.cc",
  //     caption: "Monkey!",
  //   },
  // ];
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
        />
      ))}
    </div>
  );
};

export default Posts;
