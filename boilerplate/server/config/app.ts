'use strict'

var env = process.env.ALOURA_ENV || 'dev'
var path = require('path')
var config = {}
config.app = {
  root: path.normalize(__dirname + '/../..'),
  env: process.env.NODE_ENV,
  secret: process.env.SECRET || 'secret key', /* used in signing the jwt tokens */
  pass: process.env.PASS || 'pass' /* generic password for seed user logins */
}

var port = {
  dev: 8000,
  prod: process.env.PORT || 8000
}

config.app.port = port[env]

var rethinkdb = {
  dev: {
    host: 'localhost',
    port: 28015,
    db: 'leto'
  },
  prod: {
    host: 'localhost',
    port: 28015,
    db: 'leto'
  }
}
config.rethinkdb = rethinkdb[env]

module.exports = config