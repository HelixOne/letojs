'use strict'
/**
 * Conversations controller for serving user Conversations.
 */

var route = require('koa-route')
var jwt = require('koa-jwt')
var socket = require('../../config/socket')
var rethink = require('../../config/rethink')


// register koa routes
exports.init = function(app) {
    app.use(route.get('/api/task', getTask))
}

var getTask = function* () {
    var tasks = yield rethink.Task.run()
    this.body = tasks
}


var endpoint = '/api/task'
setTimeout(function() {
    var ns = socket.io.of(endpoint)
    socket.connections[endpoint] = ns
    ns.on('connection', hc(endpoint))
}, 100)




var hc = function(token) {
    console.log('new connection')
    return function(s) {
        s.on('task', function(task) {
            console.log('save')
            var t = new rethink.Task(task)
            t.save()
        })
    }

}


rethink.r.db('leto')
    .table("Task")
    .changes()
    .run(function(err, cursor) {
        if (err) throw err
        cursor.each(function(err, task) {
            
             console.log('t ask',task.new_val)
             
             socket.connections[endpoint].emit('task', task.new_val)

            // if (err) throw err
            // r.db('dArtagnan')
            //     .table("Conversation")
            //     .get(chat.new_val.conversationId)
            //     .run(function(err, conversation) {
            //         console.log('con',conversation)
            //         console.log('chat',chat.new_val)
            //         if (err) throw err
            //         var i = conversation.topic
            //     conversation.dialogue = [chat.new_val]
            //         if (i && connections[i]) {
            //             console.log('send')
                        
            //             connections[i].emit('conversation', conversation)

            //         }                    
            //     })

        })

    })

