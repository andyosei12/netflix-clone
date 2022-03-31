import React from "react";
import Card from "./Card";
import styles from "./SectionCard.module.css";

interface Videos {
  imgUrl: string;
}

interface SectionCardsProps {
  title: string;
  videos: Videos[];
  size: string;
}

const SectionCards: React.FC<SectionCardsProps> = ({ title, videos, size }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, index) => (
          <Card key={index} id={index} imgUrl={video.imgUrl} size={size} />
        ))}
      </div>
    </section>
  );
};

export default SectionCards;
