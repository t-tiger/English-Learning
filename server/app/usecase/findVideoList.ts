import VideoRepository from "app/repository/video";
import { VideoOutline } from "app/domain/video";

const VOX_CHANNEL_ID = "UCLXo7UDZvByw2ixzpQCufnA";
const CNBC_CHANNEL_ID = "UCvJJ_dzjViJCoLf5uKUTwoA";
const COLD_FUSION_ID = "UC4QZ_LsYcvcq7qOsOhpAX4A";

export default class FindVideoListUsecase {
  constructor(private videoRepo: VideoRepository) {}

  async execute(): Promise<VideoOutline[]> {
    const channels = [VOX_CHANNEL_ID, CNBC_CHANNEL_ID, COLD_FUSION_ID];
    const videos = await Promise.all(
      channels.map((channelId) => this.videoRepo.findByChannelId(channelId))
    );
    return videos
      .reduce((prev, vs) => prev.concat(vs), [])
      .sort((a, b) => (a.publishedAt > b.publishedAt ? -1 : 1));
  }
}
