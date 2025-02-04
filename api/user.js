import axios from '../config/axios'

// 账号密码登录
export const postLogin = (data) => axios({
  method: 'post',
  url: '/user/login',
  data
})

// 账号密码注册
export const postRegister = (data) => axios({
  method: 'post',
  url: '/user/register',
  data
})