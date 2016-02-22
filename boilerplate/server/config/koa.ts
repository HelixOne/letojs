'use strict'

var fs = require('fs');
var logger = require('koa-logger');
var send = require('koa-send');
var jwt = require('koa-jwt');
var cors = require('koa-cors');
var bodyParser = require('koa-bodyparser');
var socket = require('./socket');
var config = require('./app');
var serve = require('koa-static');
var path = require('path');

module.exports = function (app) {
  // middleware configuration
  if (config.app.env !== 'test') {
    app.use(logger())
  }


  app.use(cors({
    maxAge: config.app.cacheTime / 1000,
    credentials: true,
    methods: 'GET, HEAD, OPTIONS, PUT, POST, DELETE',
    headers: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  }))
  app.use(bodyParser())

  // register public controllers which should come before any jwt token check and be publicly accessible
  // Loading Public Api
  var publicPath = path.join(path.dirname(__dirname), '/controllers/public')
  console.log(publicPath)
  fs.readdirSync(publicPath).forEach(function (file) {
    if (path.parse(file).ext !== '.js') return
    require(path.join(publicPath, file)).init(app)
  })


  app.use(serve('node_modules'))
  app.use(serve('www'))

  // mount all the routes defined in the api controllers
  fs.readdirSync('./server/controllers/private').forEach(function (file) {
    if (path.parse(file).ext !== '.js') return
    require('../controllers/' + file).init(app)
  })
}
