import { Express } from "express";
import VideoController from "app/controller/videos";
import VideoRepository from "app/repository/video";

const videoRepo = new VideoRepository();
const videoController = new VideoController(videoRepo);

export const registerRoutes = (app: Express) => {
  app.get("/videos/:id", videoController.show);
};
