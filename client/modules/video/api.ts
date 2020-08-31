import axios from 'axios'
import { VideoDetail, VideoOutline } from 'modules/video/types'
import { API_ENDPOINT } from 'const/index'

export const fetchVideos = async (): Promise<{ videos: VideoOutline[] }> => {
  const { data } = await axios.get(`${API_ENDPOINT}/videos`)
  return data
}

export const fetchVideoDetail = async (id: string): Promise<VideoDetail> => {
  const { data } = await axios.get(`${API_ENDPOINT}/videos/${id}`)
  return data
}
