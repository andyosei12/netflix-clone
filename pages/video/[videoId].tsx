import { GetStaticProps, GetStaticPaths } from "next";
import Modal from "react-modal";
import Navbar from "../../components/nav/Navbar";
import { useRouter } from "next/router";
import clsx from "classnames";

import styles from "../../styles/Videos.module.css";
import { getYoutubeVideoById } from "../../lib/videos";

Modal.setAppElement("#__next");

export const getStaticProps: GetStaticProps = async (context) => {
  const videoId = context?.params?.videoId;

  const video = await getYoutubeVideoById(videoId);

  return {
    props: {
      video: video.length > 0 ? video[0] : {},
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const listOfVideos = ["-WYdUaK54fU", "Pj0wz7zu3Ms&t", "HhesaQXLuRY"];

  const paths = listOfVideos.map((videoId) => ({
    params: { videoId },
  }));

  return { paths, fallback: "blocking" };
};

type Video = {
  title: string;
  publishTime: string;
  description: string;
  channelTitle: string;
  viewCount: string;
};

type VideoProps = {
  video: Video;
};

const Video = ({ video }: VideoProps) => {
  const router = useRouter();

  const {
    query: { videoId },
  } = router;

  const { title, publishTime, description, channelTitle, viewCount } = video;

  return (
    <div className={styles.container}>
      <Navbar />
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com&controls=0&rel=0`}
          frameBorder="0"
        ></iframe>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
