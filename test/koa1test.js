/* global describe it */
const supertest = require('supertest')
const assert = require('assert')

const pkg = require('../package')
const ver = require('../version')
const koaServer = require('./koa1')
const reqKoa = supertest(koaServer)

describe('koa1', () => {
  it('/', async () => {
    let rt = await reqKoa.get('/')
      .expect(200)
    assert.strictEqual(rt.text, 'hello world')
  })

  it('/version', async () => {
    let rt = await reqKoa.get('/version')
      .expect(200)
    assert.strictEqual(rt.body.version, pkg.version)
    assert.strictEqual(rt.body.name, pkg.name)
    assert.strictEqual(rt.body.buildTime, ver.TIME)
    assert.strictEqual(rt.body.buildCommit, ver.COMMIT)
  })

  it('/version/test', async () => {
    let rt = await reqKoa.get('/version/test')
      .expect(200)
    assert.strictEqual(rt.text, 'version test')
  })
})