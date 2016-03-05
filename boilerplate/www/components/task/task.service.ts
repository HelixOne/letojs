import {Injectable, Component, Output, EventEmitter, NgZone} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import io from 'socket.io/socket.io.js';
import _ from 'lodash/index.js';
import uuid from 'uuid-v4/index.js';
import {Task} from './task';
var route = '/api/task'
var socket = io(route);

@Injectable()
export class TaskService {

    tasks: Task[] = [];

    constructor(http: Http, private _ngZone: NgZone) {

        http.get(route).subscribe((data: Array<any>) => {
            this.tasks = data.json()
        })
        socket.on('task', (task) => {
            this._ngZone.runOutsideAngular(() => {
                let i = _.findIndex(this.tasks, { 'id': task.id });
                i = i === -1 ? this.tasks.length : i
                let arr = this.tasks
                arr[i] = task
                this.tasks = arr;
                this._ngZone.run(() => { });
            })
        })
    }

    add(task) {
        this.tasks.push(task);
        socket.emit('task', task)

    }
}
