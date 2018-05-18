/* global describe it */
const supertest = require('supertest')
const assert = require('assert')

const pkg = require('../package')

const koaServer = require('./koa')
const reqKoa = supertest(koaServer)
const toa = require('./toa')
const reqToa = supertest(toa.server)
const express = require('./express')
const reqExpress = supertest(express)
const ver = require('../version')

describe('koa2', () => {
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

describe('toa', () => {
  it('/', async () => {
    let rt = await reqToa.get('/')
      .expect(200)
    assert.strictEqual(rt.text, 'hello world')
  })

  it('/version', async () => {
    let rt = await reqToa.get('/version')
      .expect(200)
    assert.strictEqual(rt.body.version, pkg.version)
    assert.strictEqual(rt.body.name, pkg.name)
    assert.strictEqual(rt.body.buildTime, ver.TIME)
    assert.strictEqual(rt.body.buildCommit, ver.COMMIT)
  })

  it('/version/test', async () => {
    let rt = await reqToa.get('/version/test')
      .expect(200)
    assert.strictEqual(rt.text, 'version test')
  })
})

describe('express', () => {
  it('/', async () => {
    let rt = await reqExpress.get('/')
      .expect(200)
    assert.strictEqual(rt.text, 'hello world')
  })

  it('/version', async () => {
    let rt = await reqExpress.get('/version')
      .expect(200)
    assert.strictEqual(rt.body.version, pkg.version)
    assert.strictEqual(rt.body.name, pkg.name)
    assert.strictEqual(rt.body.buildTime, ver.TIME)
    assert.strictEqual(rt.body.buildCommit, ver.COMMIT)
  })

  it('/version/test', async () => {
    let rt = await reqExpress.get('/version/test')
      .expect(200)
    assert.strictEqual(rt.text, 'version test')
  })
})
