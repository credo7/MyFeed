import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { useRecoilState } from 'recoil';

import { welcomeMessageState } from '../atoms/modalAtom';
import { useAuth } from '../components/Context/AuthContext';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Modal from '../components/NewPostModal';
import StoryView from '../components/StoriesView';

const Home: NextPage = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [isWelcomeMessage, setIsWelcomeMessage] =
    useRecoilState(welcomeMessageState);

  useEffect(() => {
    if (!currentUser) router.push(`${process.env.BASE_PATH}/auth/signin`);
  }, [currentUser]);

  return (
    <>
      <div className="">
        {isWelcomeMessage && (
          <div className="w-screen fixed bottom-4 z-50 flex items-center justify-center">
            <div className="bg-gray-50 shadow-md rounded-[32px] w-[calc(100%-32px)] md:w-[640px] border-[1px] border-gray-200 h-full flex flex-col space-y-2 justify-center p-6">
              <div className="flex justify-between items-center">
                <p className="font-medium">Welcome to my App!</p>
                <GrClose
                  className=" hover:scale-110"
                  onClick={() => setIsWelcomeMessage(false)}
                />
              </div>
              <span>
                This project written on NextJS, that's why GitHub pages may not
                transfer all functionality. But i hope that you will like it!
                Good watching!)
              </span>
            </div>
          </div>
        )}
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
      {/* {isStartMessage ? (<div className="absolute w-full vh_for_iphones flex justify-center px-4">
        <div className=" w-full md:w-[640px] fixed bottom-4 z-50 flex items-center justify-center">
          <div className="bg-gray-50 shadow-md rounded-[32px] w-[calc(100%-32px)] border-[1px] border-gray-200 h-full flex flex-col space-y-2 justify-center p-6">
            <div className='flex justify-between items-center'>
              <p className='font-medium'>Welcome to my App!</p>
              <GrClose className=' hover:scale-110' onClick={() => setIsStartMessage(false)} />
            </div>
            <span>
              This project written on NextJS, that's why GitHub pages may not
              transfer all functionality. But i hope that you will like it! Good
              watching!)
            </span>
          </div>
        </div>
      </div>):""} */}
    </>
  );
};

export default Home;
