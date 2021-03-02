import { Express } from "express";
import { cache } from "app/controller/middlewares";

import VideoController from "app/controller/videos";
import VideoRepository from "app/repository/video";
import FindVideoListUsecase from "app/usecase/findVideoList";
import FindVideoDetailUsecase from "app/usecase/findVideoDetail";

const videoRepo = new VideoRepository();
const findVideoListUsecase = new FindVideoListUsecase(videoRepo);
const findVideoDetailUsecase = new FindVideoDetailUsecase(videoRepo);
const videoController = new VideoController(
  findVideoListUsecase,
  findVideoDetailUsecase
);

export const registerRoutes = (app: Express) => {
  app.get("/videos", cache(1800, "application/json"), videoController.index);
  app.get("/videos/:id", cache(1800, "application/json"), videoController.show);
};
