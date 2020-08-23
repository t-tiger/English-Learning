export type YouTubeVideoOutline = {
  id: string
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: YouTubeVideoThumbnail;
    medium?: YouTubeVideoThumbnail;
    high?: YouTubeVideoThumbnail;
    standard?: YouTubeVideoThumbnail;
    maxres?: YouTubeVideoThumbnail;
  };
  channelTitle: string
  tags: string[]
};

type YouTubeVideoThumbnail = {
  url: "https://i.ytimg.com/vi/Rd8J-9uUnfc/default.jpg";
  width: 120;
  height: 90;
};

export type YouTubeVideoCaption = {
  start: number;
  duration: number;
  text: string;
};
