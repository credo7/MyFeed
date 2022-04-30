import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import { db } from "../../firebase";
import { FaUserCheck } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useRouter } from "next/router";
import { useAuth } from "../../components/Context/AuthContext";
import Posts from "../../components/Feed/Posts";
import ProfilePosts from "./ProfilePosts";
import Modal from "../../components/NewPostModal";

// interface Props {
//   user: {
//     photoURL: string;
//     username: string;
//     name: string;
//   };
//   posts: Post[];
// }

// interface Post {
//   userId: string;
//   imageURL: string;
// }

const Profile = (props: any) => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    if (!currentUser) router.push("/auth/signin");
  }, [currentUser]);

  useEffect(() => {
    if (currentUser.uid == props.user.uid) {
      setOwner(true);
    } else {
      setOwner(false);
    }
  }, [currentUser, props.user]);

  return (
    <>
      {currentUser && (
        <div className="w-full h-screen flex flex-col items-center">
          <Header />
          <div className=" max-w-[975px] sm:px-[20px] pt-[30px]">
            <div className="flex flex-col mb-[20px] sm:mb-0 justify-center items-center sm:flex-row px-[16px] sm:px-0">
              <div className="min-w-[150px] md:min-w-[292px] sm:mr-[30px]">
                <img
                  className="mx-auto w-[120px] h-[120px] md:w-[168px] md:h-[168px] p-[5px] object-cover rounded-full border-[3px] border-red-500"
                  src={
                    props.user.photoURL ||
                    "data:image/jpeg;base64,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"
                  }
                />
              </div>
              {/* right aside */}
              <section className="flex flex-col space-y-4 sm:space-y-6 justify-center">
                <div className="flex flex-col sm:flex-row space-x-4 justify-start items-center">
                  <h2 className=" text-3xl font-light mb-2 sm:mb-0">
                    {props.user.username}
                  </h2>
                  {owner ? (
                    <button className="py-[5px] px-[9px] bg-white border-[1px] rounded-[3px] text-sm font-medium">
                      Edit profile
                    </button>
                  ) : (
                    <>
                      <div className="flex flex-row space-x-2">
                        <button className="py-[5px] px-[9px] bg-white border-[1px] rounded-[3px] text-sm font-medium">
                          Message
                        </button>
                        <button className="py-[5px] px-[16px] bg-white border-[1px] rounded-[3px] text-sm">
                          <FaUserCheck />
                        </button>
                      </div>
                      <BsThreeDots className="hidden sm:block w-6 h-6" />
                    </>
                  )}
                </div>
                <ul className="hidden sm:flex flex-row space-x-4">
                  <li className="">
                    <span className="font-medium">{props.posts.length}</span>
                    &nbsp; {props.posts.length == 1 ? "post" : "posts"}
                  </li>
                  <li className="">
                    <span className="font-medium">270k</span>
                    &nbsp;followers
                  </li>
                  <li className="">
                    <span className="font-medium">1022</span>
                    &nbsp;followings
                  </li>
                </ul>
                <div>
                  <div className=" font-medium">{props.user.name || " "}</div>
                  <span>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Asperiores beatae iure praesentium corporis facere aliquam
                    doloribus eaque delectus in perferendis impedit, magni sint
                    molestias culpa eum consequatur temporibus cumque vero!
                  </span>
                </div>
              </section>
            </div>
            <hr className="m-8 mx-0"></hr>
            <ProfilePosts posts={props.posts} />
          </div>
        </div>
      )}
      <Modal />
    </>
  );
};

export default Profile;

export async function getStaticProps({ params }: any) {
  const docRef = collection(db, "users");
  const q = query(docRef, where("username", "==", params.userId));

  const profileInfo = await getDocs(q);

  const userUid = profileInfo?.docs[0]?.data().uid;

  const postsRef = collection(db, "posts");
  const res = [] as any;
  if (userUid) {
    const postsQ = query(postsRef, where("user_uid", "==", userUid));

    const postsInfo = await getDocs(postsQ);

    await postsInfo.forEach((doc) => {
      if (doc.data()) {
        res.push(JSON.parse(JSON.stringify(doc.data())));
      }
    });
  }

  return {
    props: {
      user: profileInfo?.docs[0]?.data(),
      posts: res,
    },
  };
}

export async function getStaticPaths() {
  const res: any = [];
  const docsRef = collection(db, "users");
  const q = query(docsRef);

  const querySnapshot = await getDocs(q);

  await querySnapshot.forEach((doc) => {
    res.push(doc.get("username"));
  });

  return {
    paths: res.map((user: string) => {
      return {
        params: {
          userId: user,
        },
      };
    }),
    fallback: false,
  };
}
