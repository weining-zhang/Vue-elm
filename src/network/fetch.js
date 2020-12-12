const baseUrl = '//elm.cangdu.org'

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
  type = type.toUpperCase()
  url = baseUrl + url

  if (type === 'GET') {
    let dataStr = '' // 数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += `${key}=${data[key]}&` // 最后一个参数也加了&, 后面要去除
    })

    if (dataStr) {
      dataStr = dataStr.slice(0, dataStr.length - 1)
      url += `?${dataStr}`
    }
  }

  if (window.fetch && method === 'fetch') {
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
				'Content-Type': 'application/json'
      },
      mode: 'cors', // 确定这个请求是否跨域, 默认参数为: no-cors
      cache: 'force-cache'
    }

    if (type === 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {
      const response = await fetch(url, requestConfig)
      const responseJSON = await response.json()
      return responseJSON
    } catch(err) {
      throw new Error(err)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest()
      } else {
        requestObj = new ActiveXObject
      }

      let sendData = ''
      if (type === 'POST') {
        sendData = JSON.stringify(data)
      }

      requestObj.open(type, url, true)
      requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
      requestObj.send(sendData)

      requestObj.onreadystatechange = function() {
        if (requestObj.readyState === 4) {
          if (requestObj.status === 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj)
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}