import type { NextPage } from "next";
import Head from "next/head";
import BucketList from "@/components/BucketList";
import Header from "@/components/Header";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Before I Die I</title>
        <meta name="description" content="A bucket list app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <BucketList />
      </main>
    </div>
  );
};

export default Home;
