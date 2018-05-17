var express = require('express')
var pkg = require('../package')
var versionMw = require('../index')(pkg)

var app = express()
app.use(versionMw)
app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/version/test', function (req, res) {
  res.send('version test')
})

module.exports = app.listen(3002)
