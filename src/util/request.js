export default async function (url, method = 'GET') {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest()

    xhr.open(method, url)

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

    xhr.send()
  })
}
