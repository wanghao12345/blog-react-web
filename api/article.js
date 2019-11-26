import axios from '../config/axios'

// 获取文章列表
export const getArticleList = (params) => axios({
  method: 'get',
  url: '/article/list',
  params
})

// 获取文章详情
export const getArticleDetail = (id) => axios({
  method: 'get',
  url: `/article/detail/${id}`,
})
