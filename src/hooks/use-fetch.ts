import { get } from '@/utils/utils'
import { ElMessage } from 'element-plus'
const baseURL = '/api'
export const useFetch = async (url:string, config = {
  resType: 'json'
}) => {
  const res = await fetch(baseURL + url, {
    method: 'post',
  })
  if (config.resType === 'json') {
    return res.json()
  }
  if (['blob', 'file'].includes(config.resType)) {
    return res.json()
  }
}
