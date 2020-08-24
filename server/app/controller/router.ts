import { Express } from "express";
import VideoController from "app/controller/videos";
import VideoRepository from "app/repository/video";
import { cache } from "app/controller/cacheMiddleware";

const videoRepo = new VideoRepository();
const videoController = new VideoController(videoRepo);

export const registerRoutes = (app: Express) => {
  app.get("/videos/:id", cache(100, "application/json"), videoController.show);
};
