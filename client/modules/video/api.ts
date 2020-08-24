import axios from 'axios'
import { VideoDetail } from 'modules/video/types'
import { API_ENDPOINT } from 'const/index'

export const fetchVideoDetail = async (id: string): Promise<VideoDetail> => {
  const { data } = await axios.get(`${API_ENDPOINT}/videos/${id}`)
  return data
}
