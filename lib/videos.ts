import videoTestData from "../data/videos.json";
import YoutubeVideoResults from "../models/YoutubeVideosResults";

const fetchVideos = async (url: string): Promise<YoutubeVideoResults> => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const BASE_URL = "youtube.googleapis.com/youtube/v3";

  const response = await fetch(
    `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
  );
  return await response.json();
};

export const getCommonVideos = async (url: string) => {
  try {
    // const BASE_URL = "youtube.googleapis.com/youtube/v3";

    // const response = await fetch(
    //   `https://${BASE_URL}/${url}&maxResults=25&key=${YOUTUBE_API_KEY}`
    // );
    // const data: YoutubeVideoResults = await response.json();DEVELOPMENT
    const isDev = process.env.DEVELOPMENT;

    const data: YoutubeVideoResults = isDev
      ? videoTestData
      : await fetchVideos(url);
    // const data = await fetchVideos(url);

    if (data.error) {
      console.error("Youtube api error", data.error);
      return [];
    }

    return data.items.map((item) => {
      const id = item.id?.videoId || item.id;
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        channelTitle: item.snippet.channelTitle,
        viewCount: item.statistics?.viewCount ? item.statistics.viewCount : "0",
      };
    });
  } catch (error) {
    console.log("Something went wrong with video library", error);
    return [];
  }
};

export const getVideos = (searchQuery: string) => {
  const URL = `search?part=snippet&q=${searchQuery}`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL =
    "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";
  return getCommonVideos(URL);
};

export const getYoutubeVideoById = (videoId: any) => {
  const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return getCommonVideos(URL);
};
