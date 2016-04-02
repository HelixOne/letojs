import {Injectable, Component, Output, EventEmitter, NgZone} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import io from 'socket.io/socket.io.js';
import {Task} from './task';
import {Observable}     from 'rxjs/Rx';


@Injectable()
export class TaskService {
     route = '/api/task'
     public socket = {}

    tasks: Observable<Task[]>;

    constructor(private _http: Http) {

        this.tasks = this._http.get(this.route).map((response: Response) => <Task[]>response.json())
        
    }

    add(task) {
        if(!this.socket.emit){
            this.socket = io(this.route);
        }
       this.socket.emit('task', task)
    }
    
   
    
    get() {
           this.socket = io(this.route);
            return Observable.fromEvent(this.socket, 'task')
          
    }
    
}
