import axios from "axios";
import { VideoCaption, VideoOutline } from "app/domain/video";
import { APIError } from "app/domain/error";

const getSubtitles = require("youtube-captions-scraper").getSubtitles;

export default class VideoRepository {
  outline = async (videoId: string): Promise<VideoOutline> => {
    try {
      const url = `https://www.googleapis.com/youtube/v3/videos?key=${process.env.GOOGLE_API_KEY}&part=snippet&id=${videoId}`;
      const { data } = await axios.get(url);
      const {
        snippet: {
          title,
          description,
          publishedAt,
          thumbnails,
          channelTitle,
          tags,
        },
      } = data.items[0];
      return {
        id: videoId,
        title,
        description,
        publishedAt,
        thumbnails,
        channelTitle,
        tags,
      };
    } catch (e) {
      throw new APIError(e);
    }
  };
  captions = async (videoId: string): Promise<VideoCaption[]> => {
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
}
