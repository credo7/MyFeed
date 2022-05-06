import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/NewPostModal";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "../components/Context/AuthContext";
import StoryView from "../components/StoriesView";

const Home: NextPage = () => {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) router.push(`/auth/signin`);
  }, [currentUser]);

  return (
    <div className="">
      {currentUser ? (
        <>
          <Head>
            <title>Instagram</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Header />
          <Feed />
          <Modal />
          <StoryView />
          <footer className=""></footer>
        </>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <h1 className="text-3xl">Redirecting...</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
