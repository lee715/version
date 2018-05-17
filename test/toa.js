var Toa = require('toa')
var Router = require('toa-router')

var pkg = require('../package')
var versionMw = require('../index')(pkg)

var app = module.exports = new Toa()
var router = new Router()
app.use(versionMw)

router.get('/', function * () {
  this.body = 'hello world'
})
router.get('/version/test', function * () {
  this.body = 'version test'
})
app.use(router.toThunk())

app.listen(3001)
