import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { useAuth } from '../../components/Context/AuthContext';

const SignIn = () => {
  const { signin, currentUser, signinAsGuest } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (currentUser) router.push(`${process.env.BASE_PATH}/`);
  }, [currentUser]);

  async function handleSubmit(e: MouseEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await signin(emailRef.current.value, passwordRef.current.value);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  const handleClickSignUp = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push(`${process.env.BASE_PATH}/auth/signup`);
  };

  const handleClickSigninAsGuest = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setGuestLoading(true);

    try {
      await signinAsGuest();
    } catch (e) {
      console.log(e);
    }

    setGuestLoading(false);
  };

  return (
    <>
      {!currentUser ? (
        <>
          {' '}
          <Head>
            <title>Sign in</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <div className="min-h-[580px] flex flex-row vh_for_iphones w-full items-center justify-center">
            <div className="relative flex flex-row items-start justify-start">
              <div className="hidden lg:block">
                <img
                  className="h-[582px]"
                  src={`${process.env.BASE_PATH}/LoginPics/background.png`}
                />
                <img
                  className="absolute top-[24px] left-[142px] h-[496px]"
                  src={`${process.env.BASE_PATH}/LoginPics/first.png`}
                />
              </div>
              <div className="flex flex-col space-y-4">
                <div
                  className="bg-white flex flex-col h-[400px] w-[350px] justify-center items-center box border-[1px]
       rounded-[32px] border-gray-100 shadow-sm"
                >
                  <div className="h-[100px] flex items-center justify-center">
                    <img
                      className="h-[51px] w-auto"
                      src={`${process.env.BASE_PATH}/instTextLogo.svg`}
                    />
                  </div>
                  <div className="flex flex-col w-full space-y-4 px-10 items-center justify-center">
                    <form onSubmit={() => handleSubmit} className="space-y-3">
                      <input
                        ref={emailRef}
                        placeholder="email"
                        type="email"
                        className="h-[38px] 
         placeholder-gray-400 text-[16px] px-2 rounded-[10px] border-[1px] border-gray-100 shadow-md focus:ring-0 outline-none w-full focus:border-blue-500"
                      />
                      <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        className="h-[38px] 
         placeholder-gray-400 text-[16px] px-2 rounded-[10px] border-[1px] border-gray-100 shadow-md focus:ring-0 outline-none w-full"
                      />
                      <button
                        type="submit"
                        className="h-[32px] bg-blue-500 text-white font-medium text-sm rounded-[32px] w-full"
                      >
                        {loading ? 'loading...' : 'Sign in'}
                      </button>
                    </form>

                    <div className="flex flex-row">
                      {/* <p className="font-medium text-gray-600">OR</p> */}
                    </div>
                    {/* -----Google provider-------- 
                              Comming soon
                    */}
                    {/* <p className="text-xs font-medium text-slate-700 pb-5">
                      Forgot password?
                    </p> */}
                    <div className="flex flex-col w-[350px] h-[40px] justify-center items-center box">
                      <div className="flex flex-row space-x-2">
                        <p className="text-sm">Don't have an account?</p>
                        <button
                          onClick={handleClickSignUp}
                          className="inline text-blue-500 font-medium text-sm"
                        >
                          Sign up
                        </button>
                      </div>
                    </div>
                  </div>{' '}
                  <button
                    onClick={handleClickSigninAsGuest}
                    className="text-white text-sm font-medium bg-gray-800 rounded-[32px] w-[300px] h-[40px] shadow-2xl my-2"
                  >
                    {guestLoading ? 'Loading...' : 'Log in as Guest'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <h1 className=" text-3xl">Redirecting...</h1>
        </div>
      )}
    </>
  );
};

export default SignIn;
