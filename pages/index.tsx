import type { NextPage } from "next";
import Head from "next/head";
import Feed from "./components/Feed";
import Header from "./components/Header";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Instagram</title>
      </Head>
      <Header />

      <Feed />

      <footer className=""></footer>
    </div>
  );
};

export default Home;
