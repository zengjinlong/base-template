import httpRequest from './utils'
export const example = (data) => {
  return httpRequest({
    url: `api url`,
    method: 'GET',
    params: data
  })
}
