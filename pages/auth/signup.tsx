import Head from "next/head";
import { AiOutlineGoogle } from "react-icons/ai";
import { getProviders, signIn as signIntoProvider } from "next-auth/react";
import { useAuth } from "../../components/Context/AuthContext";
import { useEffect, useRef, useState } from "react";
import router from "next/router";

const SignUp = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, currentUser } = useAuth();

  const usernameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (currentUser) router.push(`${process.env.BASE_PATH}/`);
  }, [currentUser]);

  async function handleSubmit(e: MouseEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value,
        usernameRef.current.value
      );
    } catch (e) {
      setError("Some error");
    }
    setLoading(false);
  }

  const handleClickSignIn = (e: any) => {
    e.preventDefault();
    router.push(`${process.env.BASE_PATH}/auth/signin`);
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="background_gray min-h-[580px] flex flex-row vh_for_iphones w-full items-center justify-center">
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
          <div
            className="bg-white flex flex-col w-[350px] justify-center items-center box border-[1px]
       rounded-[32px] py-[20px] border-gray-50 shadow-sm"
          >
            <div className="h-[100px] flex items-center justify-center">
              <img
                className="h-[51px] w-auto"
                src={`${process.env.BASE_PATH}/instTextLogo.svg`}
              />
            </div>

            <div className="flex flex-col w-full space-y-2 px-10 items-center justify-center ">
              <form className="space-y-3" onSubmit={handleSubmit as any}>
                <input
                  ref={emailRef}
                  required
                  type="email"
                  minLength={4}
                  placeholder="Email"
                  className="placeholder-gray-400 text-sm px-2 rounded-[10px] border-[1px] border-gray-100 shadow-md outline-none w-full focus:ring-0 focus:border-blue-500"
                />
                <input
                  ref={nameRef}
                  minLength={2}
                  required
                  placeholder="Full name"
                  className="h-[38px] 
         placeholder-gray-400 text-sm px-2 rounded-[10px] border-[1px] border-gray-100 shadow-md focus:ring-0 outline-none w-full focus:border-blue-500"
                />
                <input
                  ref={usernameRef}
                  minLength={4}
                  required
                  placeholder="Username"
                  className="h-[38px] 
         placeholder-gray-400 text-sm px-2 rounded-[10px] border-[1px] border-gray-100 shadow-md focus:ring-0 outline-none w-full focus:border-blue-500"
                />
                <input
                  ref={passwordRef}
                  minLength={6}
                  required
                  type="password"
                  placeholder="Password"
                  className="h-[38px] 
         placeholder-gray-400 text-sm px-2 rounded-[10px] border-[1px] border-gray-100 shadow-md focus:ring-0 outline-none w-full focus:border-blue-500"
                />
                {error && <label>{error}</label>}
                <button
                  type="submit"
                  disabled={loading}
                  className="h-[32px] bg-blue-500 text-white font-medium text-sm rounded-[32px] w-full"
                >
                  Sign up
                </button>
              </form>
              <div className="flex flex-row">
                {/* <p className="font-medium text-gray-600">OR</p> */}
              </div>
              {/* //-----For providers--------// */}
              {/* {Object.values(providers).map((provider: any) => (
                  <div className="pb-6" key={provider.name}>
                    <button
                      className=" text-gray-400"
                      onClick={() => signIntoProvider(provider.id)}
                    >
                      Sign in with {provider.name}
                    </button>
                  </div>
                ))} */}
              <div className="bg-white flex flex-col w-[350px] h-[40px] justify-center items-center box">
                <div className="flex flex-row space-x-2">
                  <p className="text-sm">Already have an account?</p>
                  <button
                    onClick={handleClickSignIn}
                    className="inline text-blue-500 font-medium text-sm"
                  >
                    Sign in
                  </button>
                </div>
              </div>
              <button className="text-white text-sm font-medium bg-gray-800 rounded-[32px] w-[300px] h-[40px] shadow-sm">
                Log in as Guest
              </button>
            </div>
          </div>
        </div>
      </div>
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

export default SignUp;
