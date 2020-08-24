import { NextFunction, Request, Response } from "express";
import VideoRepository from "app/repository/video";

export default class VideoController {
  constructor(private videoRepo: VideoRepository) {}

  show = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const outline = await this.videoRepo.outline(id);
      const captions = await this.videoRepo.captions(id);
      res.json({ outline, captions });
    } catch (e) {
      next(e);
    }
  };
}
