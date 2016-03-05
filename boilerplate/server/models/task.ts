
  var rethink = require('../config/rethink')
  var thinky = rethink.thinky
  var type = thinky.type
  rethink.Task = thinky.createModel('Task', {
    id: type.string(),
    name: type.string(),
    done: type.boolean()
  })
