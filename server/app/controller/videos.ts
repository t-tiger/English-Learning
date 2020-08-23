import { NextFunction, Request, Response } from "express";
import YouTubeVideoRepository from "app/repository/youtubeVideo";

export default class VideoController {
  constructor(private youtubeVideoRepo: YouTubeVideoRepository) {}

  show = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const outline = await this.youtubeVideoRepo.outline(id);
      const captions = await this.youtubeVideoRepo.captions(id);
      res.json({ outline, captions });
    } catch (e) {
      next(e);
    }
  };
}
