export default async function (url, method = 'GET', headers = {}, payload) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest()

    xhr.open(method, url)

    Object.keys(headers)
      .forEach(
        (name) =>
        xhr.setRequestHeader(name, headers[name])
      )

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response)
      } else {
        reject(xhr.status, xhr.statusText)
      }
    })

    xhr.addEventListener('error', () => {
      reject(xhr.status, xhr.statusText)
    })

    xhr.send(payload)
  })
}
