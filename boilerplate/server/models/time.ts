
  var rethink = require('../config/rethink')
  var thinky = rethink.thinky
  var type = thinky.type
  rethink.Time = thinky.createModel('Time', {
    id: type.string(),
  })
