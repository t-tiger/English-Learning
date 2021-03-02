import FindVideoDetailUsecase from "app/usecase/findVideoDetail";
import VideoRepository from "app/repository/video";

describe("FindVideoDetailUsecase", () => {
  it("returns data with outline and captions", async () => {
    const mockRepo = new VideoRepository();
    mockRepo.findCaptions = async (id: string) => {
      return [
        {
          start: 0,
          duration: 1,
          text: "caption1",
        },
        {
          start: 1,
          duration: 2,
          text: "caption2",
        },
      ];
    };
    mockRepo.findOutline = async (id: string) => {
      return {
        id,
        title: "v-title",
        description: "v-desc",
        publishedAt: "2021-01-01",
        thumbnails: {
          default: { url: "default", width: 0, height: 0 },
        },
        channelTitle: "c-title",
      };
    };

    const usecase = new FindVideoDetailUsecase(mockRepo);
    const actual = await usecase.execute("v1");
    expect(actual).toEqual({
      outline: {
        id: "v1",
        title: "v-title",
        description: "v-desc",
        publishedAt: "2021-01-01",
        thumbnails: { default: { url: "default", width: 0, height: 0 } },
        channelTitle: "c-title",
      },
      captions: [
        { start: 0, duration: 1, text: "caption1" },
        { start: 1, duration: 2, text: "caption2" },
      ],
    });
  });
});
