import * as constants from './constants'

// 存储文章
export const storeArticles = (data) => ({
  type: constants.STORE_ARTICLES,
  data: data
})

// 存储文章当前页数
export const storePage = (data) => ({
  type: constants.STORE_PAGE,
  data: data
})


// 存储是否还有下一页
export const storeHasNextPage = (data) => ({
  type: constants.HAS_NEXT_PAGE,
  data: data
})