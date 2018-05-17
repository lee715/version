var Koa = require('koa')
var Router = require('koa-router')
var pkg = require('../package')
var versionMw = require('../index')(pkg)

var app = new Koa()
app.use(versionMw)

var router = new Router()
router.get('/', function (ctx) {
  ctx.body = 'hello world'
})

router.get('/version/test', function (ctx) {
  ctx.body = 'version test'
})
app
  .use(router.routes())
  .use(router.allowedMethods())

module.exports = app.listen(3000)
