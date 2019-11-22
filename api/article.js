import axios from '../config/axios'

// 获取类型列表
export const getArticleList = (params) => axios({
  method: 'get',
  url: '/article/list',
  params
})
