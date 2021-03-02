import { NextFunction, Request, Response } from "express";
import FindVideoListUsecase from "app/usecase/findVideoList";
import FindVideoDetailUsecase from "app/usecase/findVideoDetail";

export default class VideoController {
  constructor(
    private findListUsecase: FindVideoListUsecase,
    private findDetailUsecase: FindVideoDetailUsecase
  ) {}

  index = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const videos = await this.findListUsecase.execute();
      res.json({ videos });
    } catch (e) {
      next(e);
    }
  };

  show = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const data = await this.findDetailUsecase.execute(id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  };
}
