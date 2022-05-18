interface YoutubeVideoResults {
  items: {
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
      channelTitle: string;
    };
    statistics?: {
      viewCount: string;
    };
  }[];
  error?: null;
}

export default YoutubeVideoResults;
