import type { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";

const Home: NextPage = ({ user }: any) => {
  return (
    <div className="">
      <Head>
        <title>Instagram</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="w-full min-h-[60px] border-none">
        <div className="w-full border-b-[1px] shadow-sm bg-white fixed z-50">
          <Header />
        </div>
      </div>

      <Feed />

      <Modal />

      <footer className=""></footer>
    </div>
  );
};

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      props: {},
    };
  }
  const { user } = session;
  return {
    props: { user },
  };
}

export default Home;
