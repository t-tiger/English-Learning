import { Express } from "express";
import VideoController from "app/controller/videos";
import YouTubeVideoRepository from "app/repository/youtubeVideo";

const youtubeVideoRepo = new YouTubeVideoRepository();
const videoController = new VideoController(youtubeVideoRepo);

export const registerRoutes = (app: Express) => {
  app.get("/videos/:id", videoController.show);
};
