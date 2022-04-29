import React from "react";
import Card from "./Card";
import styles from "./SectionCard.module.css";
import { Videos } from "../../models/Videos";
import Link from "next/link";

interface SectionCardsProps {
  title: string;
  videos: Videos[];
  size: string;
}

const SectionCards: React.FC<SectionCardsProps> = ({
  title,
  videos = [],
  size,
}) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, index) => (
          <Link key={index} href={`/video/${video.id}`}>
            <a>
              <Card id={index} imgUrl={video.imgUrl} size={size} />
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SectionCards;
