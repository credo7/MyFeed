import Head from "next/head";
import { AiOutlineGoogle } from "react-icons/ai";

const SignIn = (props: any) => {
  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="background_gray min-h-[580px] flex flex-row vh_for_iphones w-full items-center justify-center">
        <div className="relative flex flex-row items-start justify-start">
          <div className="hidden lg:block">
            <img className="h-[582px]" src="/LoginPics/background.png" />
            <img
              className="absolute top-[24px] left-[142px] h-[496px]"
              src="/LoginPics/first.png"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <div
              className="bg-white flex flex-col w-[350px] justify-center items-center box border-[1px]
       rounded-md"
            >
              <div className="h-[100px] flex items-center justify-center">
                <img className="h-[51px] w-auto" src="/instTextLogo.svg" />
              </div>

              <div className="flex flex-col w-full space-y-4 px-10 items-center justify-center">
                <div className="w-full flex flex-col space-y-2">
                  <input
                    placeholder="Mobile number or email address"
                    className="h-[38px] 
         placeholder-gray-400 text-sm px-2 rounded-md border-[1px] focus:ring-0 outline-none w-full"
                  />
                  <input
                    placeholder="Full name"
                    className="h-[38px] 
         placeholder-gray-400 text-sm px-2 rounded-md border-[1px] focus:ring-0 outline-none w-full"
                  />
                  <input
                    placeholder="Username"
                    className="h-[38px] 
         placeholder-gray-400 text-sm px-2 rounded-md border-[1px] focus:ring-0 outline-none w-full"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="h-[38px] 
         placeholder-gray-400 text-sm px-2 rounded-md border-[1px] border-gray-200 focus:ring-0 outline-none w-full"
                  />
                </div>

                <button className="h-[30px] bg-blue-500 text-white font-medium text-sm rounded-md w-full">
                  Sign up
                </button>
                <div className="flex flex-row">
                  <p className="font-medium text-gray-600">OR</p>
                </div>
                <div className="flex flex-row space-x-2 items-center justify-center pb-6">
                  <AiOutlineGoogle className="text-blue-900 h-6 w-6" />
                  <p className=" text-blue-900 font-medium">
                    {" "}
                    Log in with Google
                  </p>
                </div>
              </div>
            </div>
            <div>
              <button className="text-white text-sm font-medium bg-red-400 rounded-md w-[350px] h-[40px]">
                Log in as Guest
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
