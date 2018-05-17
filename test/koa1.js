var app = require('koa')()
var pkg = require('../package')
var versionMw = require('../index').koa1(pkg)

app.use(versionMw)

app.use(function * () {
  var url = this.originalUrl
  if (/^\/$/.test(url)) {
    this.body = 'hello world'
  } else if (/^\/version\/test$/.test(url)) {
    this.body = 'version test'
  } else {
    this.throw(404)
  }
})

module.exports = app.listen(3000)
