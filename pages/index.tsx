import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner/Banner";
import NavBar from "../components/nav/Navbar";
import Card from "../components/card/Card";
import styles from "../styles/Home.module.css";
import SectionCards from "../components/card/SectionCards";

const Home: NextPage = () => {
  const disneyVideos = [
    {
      imgUrl: "/static/the-blacklist.jpg",
    },
    {
      imgUrl: "/static/the-blacklist.jpg",
    },
    {
      imgUrl: "/static/the-blacklist.jpg",
    },
    {
      imgUrl: "/static/the-blacklist.jpg",
    },
    {
      imgUrl: "/static/the-blacklist.jpg",
    },
  ];
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Clone</title>
        <meta name="description" content="Netflix Clone App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar userName="Drew Osei" />
      <Banner
        title="The Blacklist"
        subTitle="He told you not to trust him"
        imgUrl="/static/the-blacklist.jpg"
      />
      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large" />
        <SectionCards title="Disney" videos={disneyVideos} size="medium" />
      </div>
    </div>
  );
};

export default Home;
