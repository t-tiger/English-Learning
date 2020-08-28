export type VideoOutline = {
  id: string
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: VideoThumbnail;
    medium?: VideoThumbnail;
    high?: VideoThumbnail;
    standard?: VideoThumbnail;
    maxres?: VideoThumbnail;
  };
  channelTitle: string
};

type VideoThumbnail = {
  url: string;
  width: number;
  height: number;
};

export type VideoCaption = {
  start: number;
  duration: number;
  text: string;
};
