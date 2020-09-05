import { NextFunction, Request, Response } from "express";
import VideoRepository from "app/repository/video";
import { VideoOutline } from "app/domain/video";

const VOX_CHANNEL_ID = "UCLXo7UDZvByw2ixzpQCufnA";
const CNBC_CHANNEL_ID = "UCvJJ_dzjViJCoLf5uKUTwoA";
const COLD_FUSION_ID = "UC4QZ_LsYcvcq7qOsOhpAX4A";

export default class VideoController {
  constructor(private videoRepo: VideoRepository) {}

  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const channels = [VOX_CHANNEL_ID, CNBC_CHANNEL_ID, COLD_FUSION_ID];
      const videos: VideoOutline[] = (
        await Promise.all(
          channels.map((channelId) => this.videoRepo.findByChannelId(channelId))
        )
      )
        .reduce((prev, vs) => prev.concat(vs), [])
        .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
      res.json({ videos });
    } catch (e) {
      next(e);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const [outline, captions] = await Promise.all([
        this.videoRepo.outline(id),
        this.videoRepo.captions(id),
      ]);
      res.json({ outline, captions });
    } catch (e) {
      next(e);
    }
  };
}
