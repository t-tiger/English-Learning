export type VideoDetail = {
  outline: {
    id: string
    title: string
    description: string
    publishedAt: string
    thumbnails: {
      default: VideoThumbnail
      medium?: VideoThumbnail
      high?: VideoThumbnail
      standard?: VideoThumbnail
      maxres?: VideoThumbnail
    }
    channelTitle: string
    tags: string[]
  }
  captions: VideoCaption[]
}

type VideoThumbnail = {
  url: 'https://i.ytimg.com/vi/Rd8J-9uUnfc/default.jpg'
  width: 120
  height: 90
}

export type VideoCaption = {
  start: number
  duration: number
  text: string
}
