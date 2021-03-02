import axios from "axios";
const getSubtitles = require("youtube-captions-scraper").getSubtitles;

import { VideoCaption, VideoOutline } from "app/domain/video";
import { APIError } from "app/domain/error";

type Snippet = {
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: Thumbnail;
    medium?: Thumbnail;
    high?: Thumbnail;
    standard?: Thumbnail;
    maxres?: Thumbnail;
  };
  channelTitle: string;
};

type Thumbnail = {
  url: string;
  width: number;
  height: number;
};

export default class VideoRepository {
  findByChannelId = async (
    channelId: string,
    opts?: { limit?: number }
  ): Promise<VideoOutline[]> => {
    const limit = opts?.limit || 20;
    const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.GOOGLE_API_KEY}&channelId=${channelId}&part=snippet&order=date&maxResults=${limit}`;
    const { data } = await axios.get(url);
    return data.items.map(({ id: { videoId }, snippet }: any) =>
      this.buildVideoOutline(videoId, snippet)
    );
  };

  findOutline = async (videoId: string): Promise<VideoOutline> => {
    try {
      const url = `https://www.googleapis.com/youtube/v3/videos?key=${process.env.GOOGLE_API_KEY}&part=snippet&id=${videoId}`;
      const { data } = await axios.get(url);
      const { snippet } = data.items[0];
      return this.buildVideoOutline(videoId, snippet);
    } catch (e) {
      throw new APIError(e);
    }
  };

  findCaptions = async (videoId: string): Promise<VideoCaption[]> => {
    try {
      const captions = await getSubtitles({
        videoID: videoId,
        lang: "en",
      });
      return captions.map(({ start, dur, text }: any) => ({
        start: Number(start),
        duration: Number(dur),
        text,
      }));
    } catch (e) {
      throw new APIError(e);
    }
  };

  private buildVideoOutline = (
    videoId: string,
    snippet: Snippet
  ): VideoOutline => {
    const {
      title,
      description,
      publishedAt,
      thumbnails,
      channelTitle,
    } = snippet;
    return {
      id: videoId,
      title: unescape(title),
      description,
      publishedAt,
      thumbnails,
      channelTitle,
    };
  };
}
