import request from 'superagent'
import config from '../../config/config'

export default async function (htmlFile) {
  let results
  let validatorUrl = config.get('validatorUrl')
  let formData = new FormData()

  formData.append('file', htmlFile)

  results = await request(validatorUrl, 'POST', {}, formData)
  results = JSON.parse(results)
  results = transformResults(results)

  return results
}

function transformResults (results) {
  return results
}
