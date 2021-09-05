// 创建koa对象
const Koa = require('koa')
const app = new Koa()

// 注册中间件
// ctx:上下文 web容器 ctx.request ctx.response
// next: 下一个中间件，是否被执行，通过next
const respDurationMiddleware = require('./middleware/koa_response_duration')
app.use(respDurationMiddleware)

const respHeaderMiddleware = require('./middleware/koa_response_header')
app.use(respHeaderMiddleware)

const respDateMiddleware = require('./middleware/koa_response_data')
app.use(respDateMiddleware)
//  绑定端口号
app.listen(3333)

const webSocket = require('./services/web_socker_services')
webSocket.listen()