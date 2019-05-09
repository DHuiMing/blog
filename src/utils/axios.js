import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '../store'
import Qs from 'qs'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL, // api的base_url
  timeout: 15000                  // 请求超时时间2
})
// request拦截器
service.interceptors.request.use(config => {
  config.data=Qs.stringify(config.data)
  return config
}, error => {
  // Do something with request error
  console.error(error) // for debug
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code == '2000' || res.code == '6520' || res.code == '0') {
      return res;
    }
    if (res.code == '100') {
      return res.info;
    } else if (res.code == "8500") {
      Message({
        showClose: true,
        message: res.msg,
        type: 'error',
        duration: 500,
        onClose: () => {
          store.dispatch('user/FedLogOut')
        }
      });
      return Promise.reject("Token失效")
    } else {
      Message({
        message: res.msg,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject(res)
    }
  },
  error => {
    console.error('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)
export default service

