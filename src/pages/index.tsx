import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {

  const hello = api.example.hello.useQuery({ text: "Aventus" });

  return (
    <>
      <Head>
        <title>Aventus</title>
        <meta name="Aventus OSRS Clan" content="Aventus Admin Panel" />
        <link rel="icon" href="/favicon.ico" />
      </Head>  
      <div>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#155e75] to-[#304350]">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <div className="flex flex-col items-center gap-2">
              <p className="text-2xl text-white">
                {hello.data ? hello.data.greeting : "Loading tRPC query..."}
              </p>
              <SignInButton />
            </div>
          </div>
        </main>
      </div>      
    </>
  );
};

export default Home;

const SignInButton: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}       
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};