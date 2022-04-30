import Head from "next/head";
// import { AiOutlineGoogle } from "react-icons/ai";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../components/Context/AuthContext";

const SignIn = () => {
  const { signin, currentUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (currentUser) router.push("/");
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

  const handleClickSignUp = (e: any) => {
    e.preventDefault();
    router.push("signup");
  };

  return (
    <>
      {!currentUser ? (
        <>
          {" "}
          <Head>
            <title>Sign in</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
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
                  className="bg-white flex flex-col h-[400px] w-[350px] justify-center items-center box border-[1px]
       rounded-md"
                >
                  <div className="h-[100px] flex items-center justify-center">
                    <img className="h-[51px] w-auto" src="/instTextLogo.svg" />
                  </div>

                  <div className="flex flex-col w-full space-y-4 px-10 items-center justify-center">
                    <form onSubmit={handleSubmit as any} className="space-y-2">
                      <input
                        ref={emailRef}
                        placeholder="email"
                        className="h-[38px] 
         placeholder-gray-400 text-sm px-2 rounded-md border-[1px] focus:ring-0 outline-none w-full focus:border-blue-500"
                      />
                      <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        className="h-[38px] 
         placeholder-gray-400 text-sm px-2 rounded-md border-[1px] focus:ring-0 outline-none w-full border-gray-200"
                      />
                      <button
                        type="submit"
                        className="h-[30px] bg-blue-500 text-white font-medium text-sm rounded-md w-full"
                      >
                        {loading ? "loading..." : "Log in"}
                      </button>
                    </form>

                    <div className="flex flex-row">
                      <p className="font-medium text-gray-600">OR</p>
                    </div>
                    {/* -----Google provider-------- 
                              Comming soon
                    */}
                    <p className="text-xs font-medium text-slate-700 pb-5">
                      Forgot password?
                    </p>
                  </div>
                </div>
                <div
                  className="bg-white flex flex-col w-[350px] h-[40px] justify-center items-center box border-[1px]
       rounded-md"
                >
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
                <div>
                  <button className="text-white text-sm font-medium bg-red-400 rounded-md w-[350px] h-[40px]">
                    Log in as Guest
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

// export async function getServerSideProps() {
//   const providers = await getProviders();

//   return {
//     props: {
//       providers,
//     },
//   };
// }

export default SignIn;
