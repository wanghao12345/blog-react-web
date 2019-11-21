import axios from 'axios'
import Router from 'next/router'
import {message } from 'antd'
import { baseUrl } from './env'

const serviceConfig = {
  baseURL: baseUrl,
  timeout: 3000, // 超时处理
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-type': 'application/json;charset=utf-8'
  },
  retry: 4,
  retryDelay: 1000
};

const service = axios.create(serviceConfig);
// http request 拦截器
service.interceptors.request.use(
  config => {
    config.url = encodeURI(config.url)
    return config
  },
  err => {
    return Promise.reject(err)
  }
)
service.interceptors.response.use(
  response => {
    if (response.data.code === 0) {
      message.error(response.data.message)
    }
    return response.data
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 404:

          break;
        case 401:
          // 401 清除token信息并跳转到登录页面
          message.error('请重新登录');
          Router.push('/login')
          break;
        case 403:
          message.error('抱歉，您没有权限访问,请与系统管理员联系!')
          break;
        default:
          message.error('请求失败，服务器错误!')
          break;
      }
    }
    return Promise.reject(error)
  }
)

export default service
