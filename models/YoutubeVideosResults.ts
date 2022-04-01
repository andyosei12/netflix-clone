interface YoutubeVideoResults {
  items: {
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
    };
  }[];
  error: {};
}

export default YoutubeVideoResults;
