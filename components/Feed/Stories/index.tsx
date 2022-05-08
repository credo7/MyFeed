import { Key, useEffect, useState } from "react";
import faker from "@faker-js/faker";
import Story from "./Story";
import {
  onSnapshot,
  query,
  collection,
  where,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { uid } from "uid";
import { db } from "../../../firebase";
import { useAuth } from "../../Context/AuthContext"; // TODO sort-import (eslint)

const Stories = () => {
  const [stories, setStories] = useState([] as any); // TODO types
  const { currentUser } = useAuth();

  useEffect(() => {
    const storiesArr = [] as any;
    const updateStories = async () => {
      const res = [] as any;
      const userRef = collection(db, "users");
      const q = query(userRef, where("uid", "==", currentUser.uid));
      const userDocs = await getDocs(q);

      const followings = userDocs?.docs[0]?.data()?.followings;

      if (followings?.length > 0) {
        const storiesRef = collection(db, "stories");
        const storiesQ = query(
          storiesRef,
          where("user_uid", "in", followings),
          orderBy("timeStamp")
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
      className="flex space-x-4 px-5 py-2 sm:py-4 my-2 sm:my-4 sm:my-0 sm:bg-white overflow-x-scroll 
    scrollbar-hide sm:border-y sm:border-x sm:border-gray-50 sm:rounded-[32px] sm:shadow-sm sm:min-h-[118px] border-b-[1px] border-b-gray-100"
    >
      {stories.map((story: any, index: any) => (
        <Story key={index} img={story.avatar} username={story.username} />
      ))}
    </div>
  );
};

export default Stories;
