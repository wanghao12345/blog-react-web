let dev = process.env.NODE_ENV !== 'production';
export default {
  remoteHost:dev?'http://localhost:7001/':'http://47.107.229.206:7001/', //请求API地址
  backGroundImage:'/static/bg.jpg',       //网站背景图
  favicon:'/static/favicon.png',
  keyWords:'徐浩的网站',                             //seo 关键词
  websiteTitle:'徐浩的网站',
  description:'徐浩的网站',
  articleLimit:6,                               //文章显示列表的数量

}
