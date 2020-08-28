import { VideoOutline, VideoThumbnail } from 'modules/video/types'

export const findVideoThumb = (
  thumbnails: VideoOutline['thumbnails'],
  size: keyof VideoOutline['thumbnails'],
): VideoThumbnail => {
  const sizes = ['maxres', 'standard', 'high', 'medium', 'default'] as const
  const minIndex = sizes.indexOf(size)

  const foundSize =
    sizes.slice(minIndex, sizes.length).find((s) => thumbnails[s]) || 'default'
  return thumbnails[foundSize] || thumbnails.default
}

export const formatCaptionTime = (time: number): string => {
  const rounded = Math.round(time)
  const min = Math.floor(rounded / 60)
  const sec = Math.floor(rounded % 60)
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}

export const extractYoutubeVideoId = (text: string): string | null => {
  const fullRegex = /^[^#&?]{11}$/
  const fullMatch = text.match(fullRegex)
  if (fullMatch) {
    return text
  }
  const urlRegex = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]{11}).*/
  const urlMatch = text.match(urlRegex)
  if (urlMatch) {
    return urlMatch[2]
  }
  return null
}
