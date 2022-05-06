import "../styles/globals.css";
import type { AppProps } from "next/app";
// import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";
import { AuthProvider } from "../components/Context/AuthContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    // <SessionProvider session={session}>
    <AuthProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </AuthProvider>
    // </SessionProvider>
  );
}

export default MyApp;
