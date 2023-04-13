import type { NextPage } from "next";
import Head from "next/head";
import BucketList from "@/components/BucketList";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Before I Die I</title>
        <meta name="description" content="A bucket list app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <BucketList />
      </main>
    </div>
  );
};

export default Home;
