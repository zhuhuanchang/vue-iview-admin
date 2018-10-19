import axios from 'axios'
import { Message } from 'iview'
import { getToken } from '@/libs/util'
// import { Spin } from 'iview'
class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //服务器接受验证的token

        Authorization: `Bearer ${getToken()}`
      }
    }
    return config
  }
  distroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.distroy(url)
      const { data, status } = res
      // return { data, status }
      //对后端返回数据做处理
      if (data.result) {
        return data;
      } else {
        Message.error(data.error);
        return Promise.reject(data.error);
      }
    }, error => {
      Message.error(error.message);
      this.distroy(url)
      return Promise.reject(error)
    })
  }
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}
export default HttpRequest
