'use strict'
/**
 * Entry point for Leto app. Initiates database connection and starts listening for requests on configured port.
 */
var config = require('./config/app')

var rethink = require('./config/rethink')
var koaConfig = require('./config/koa')
var socket = require('./config/socket')
var co = require('co')
var koa = require('koa')
const app = koa()
module.exports = app
/**
 * Initiates a new Leto server. Returns a promise.
 * @param overwriteDB Overwrite existing database with the seed data. Useful for testing environment.
 */
app.init = co.wrap(function* (overwriteDB) {
  yield rethink.connect()

  // koa config
  koaConfig(app)
  app.server = require('http').Server(app.callback()),
  socket.io = require('socket.io')(app.server)

  app.server.listen(config.app.port)
  if (config.app.env !== 'test') {
    console.log('Leto listening on port ' + config.app.port)
  }
})
// auto init if this app is not being initialized by another module (i.e. using require('./app').init();)
if (!module.parent) {
  app.init().catch(function (err) {
    console.error(err.stack)
    process.exit(1)
  })
}
