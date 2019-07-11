import httpRequest from '@/utils/axios'
export const example = (data) => {
  return httpRequest({
    url: `api url`,
    method: 'GET',
    params: data
  })
}
