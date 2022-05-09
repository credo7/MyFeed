import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from '../components/Context/AuthContext';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Modal from '../components/NewPostModal';
import StoryView from '../components/StoriesView';

const Home: NextPage = () => {
  const router = useRouter();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) router.push(`${process.env.BASE_PATH}/auth/signin`);
  }, [currentUser]);

  return (
    <div className="">
      {currentUser ? (
        <>
          <Head>
            <meta name="theme-color" content="rgb(254,254,255)" />
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
          <div className="absolute z-50 top-0">it's magic</div>
          <h1 className="text-3xl">Redirecting...</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
