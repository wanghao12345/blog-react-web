const express = require('express')
const next = require('next')

// 不等于'production'则表示运行的是开发环境
const dev = process.env.NODE_ENV !== 'production'
// 创建一个服务端运行的Next app
const app = next({dev})
// 请求处理器
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()


    server.get('/post/:id', (req, res) => {
      app.render(req, res, '/post', {id: req.params.id})
    })

    server.get('/article/:id', (req, res) => {
      const actualPage = '/article';
      const queryParams = { id: req.params.id }
      console.log(req.params.id);
      app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(3003, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3003')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
