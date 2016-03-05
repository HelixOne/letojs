'use strict'

var config = require('./app'),
  r = require('rethinkdb')

var rethink = {}

rethink.connect = function* () {
  try {
    var conn = yield r.connect(config.rethinkdb)
    rethink.conn = conn
    rethink.thinky = require('thinky')(config.rethinkdb)
    rethink.r = rethink.thinky.r

    require('../models/time')
    require('../models/task')
  } catch(e) {
    console.log('Connection to DB Failed')
  }
}

module.exports = rethink
