import VideoRepository from "app/repository/video";
import { VideoCaption, VideoOutline } from "app/domain/video";

type Result = {
  outline: VideoOutline;
  captions: VideoCaption[];
};

export default class FindVideoDetailUsecase {
  constructor(private videoRepo: VideoRepository) {}

  async execute(videoId: string): Promise<Result> {
    const [outline, captions] = await Promise.all([
      this.videoRepo.findOutline(videoId),
      this.videoRepo.findCaptions(videoId),
    ]);
    return { outline, captions };
  }
}
