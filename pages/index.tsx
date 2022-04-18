import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Instagram</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <div className="w-full min-h-[60px] border-none">
        <div className="w-full border-b-[1px] shadow-sm bg-white fixed z-50">
          <Header />
        </div>
      </div>

      <Feed />

      <footer className=""></footer>
    </div>
  );
};

export default Home;
