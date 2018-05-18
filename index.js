var path = require('path')
var versionReg = /^\/version$/

module.exports = function (pkg) {
  var version = getVersion(pkg)

  return function () {
    var len = arguments.length
    switch (len) {
      // toa case
      case 0:
      case 1:
        if (versionReg.test(this.originalUrl)) {
          this.body = version
          this.end()
        }
        break
      // koa2 case
      case 2:
        var ctx = arguments[0]
        var next = arguments[1]
        if (versionReg.test(ctx.originalUrl)) {
          ctx.body = version
        } else {
          next()
        }
        break
      // express case
      case 3:
        var req = arguments[0]
        var res = arguments[1]
        var next = arguments[2]
        if (versionReg.test(req.originalUrl)) {
          res.send(version)
        } else {
          next()
        }
    }
  }
}

module.exports.koa1 = function (pkg) {
  var version = getVersion(pkg)

  return function * (next) {
    if (versionReg.test(this.originalUrl)) {
      this.type = 'application/json'
      this.body = version
    } else {
      yield next
    }
  }
}

function getVersion (pkg) {
  var version = {
    name: pkg.name,
    version: pkg.version,
    startTime: Date.now()
  }
  try {
    var verJson = require(path.resolve(getRoot(), './version.json'))
    if (verJson.TIME) version.buildTime = verJson.TIME
    if (verJson.COMMIT) version.buildCommit = verJson.COMMIT
  } catch (e) {}
  if (!version.buildTime && process.env.BUILD_TIME) version.buildTime = process.env.BUILD_TIME
  if (!version.buildCommit && process.env.BUILD_COMMIT) version.buildCommit = process.env.BUILD_COMMIT
  return version
}

function getRoot () {
  var nodeModuleIndex = __dirname.indexOf('/node_modules')
  if (nodeModuleIndex === -1) return path.resolve(__dirname, './')
  return __dirname.slice(0, nodeModuleIndex)
}
