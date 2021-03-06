'use strict'
/**
 * Conversations controller for serving user Conversations.
 */

var route = require('koa-route')
var jwt = require('koa-jwt')
var socket = require('../../config/socket')
var rethink = require('../../config/rethink')


// register koa routes
exports.init = function (app) {
  app.use(route.get('/api/time', getTime))
}

var getTime = function* () {
  var route = '/api/time'
  if (!socket.connections[route]) {
    var ns = socket.io.of(route)
    ns.on('connection', handleConnection(route))
    socket.connections[route] = ns
    setInterval(function () {
        console.log('Time')
      ns.emit('time', { time: Date.now() })
    }, 1000)
  }

  this.body = Date.now()
}

function handleConnection (token) {
  console.log('new connection')
  return function (socket) {}

}
