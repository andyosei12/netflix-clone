import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Banner from "../components/banner/Banner";
import NavBar from "../components/nav/Navbar";
import styles from "../styles/Home.module.css";
import SectionCards from "../components/card/SectionCards";
import { getPopularVideos, getVideos } from "../lib/videos";
import { Videos } from "../models/Videos";

export const getServerSideProps: GetServerSideProps = async () => {
  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("productivity");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getPopularVideos();
  return {
    props: { disneyVideos, productivityVideos, travelVideos, popularVideos },
  };
};

interface HomeProps {
  disneyVideos: Videos[];
  productivityVideos: Videos[];
  travelVideos: Videos[];
  popularVideos: Videos[];
}

const Home: NextPage<HomeProps> = ({
  disneyVideos,
  productivityVideos,
  travelVideos,
  popularVideos,
}) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Clone</title>
        <meta name="description" content="Netflix Clone App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <NavBar />
        <Banner
          videoId="-WYdUaK54fU"
          title="The Blacklist"
          subTitle="He told you not to trust him"
          imgUrl="/static/the-blacklist.jpg"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </div>
  );
};

export default Home;
