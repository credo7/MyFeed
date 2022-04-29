import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const Profile = (props: any) => {
  return <div>{props.user.email}</div>;
};

export default Profile;

export async function getStaticProps({ params }: any) {
  const docRef = collection(db, "users");
  const q = query(docRef, where("username", "==", params.userId));

  const profileInfo = await getDocs(q);

  return {
    props: {
      user: profileInfo.docs[0].data(),
    },
  };
}

export async function getStaticPaths() {
  const res: string[] = [];
  const docsRef = collection(db, "users");
  const q = query(docsRef);

  const querySnapshot = await getDocs(q);

  await querySnapshot.forEach((doc) => {
    res.push(doc.get("username"));
  });

  return {
    paths: res.map((user) => {
      return {
        params: {
          userId: user,
        },
      };
    }),
    fallback: false,
  };
}
