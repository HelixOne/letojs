import {Component, ChangeDetectorRef, ChangeDetectionStrategy} from 'angular2/core';
import {Leto} from '../leto/Leto';
import {Time} from '../time/time';
//import uuid from 'uuid-v4/index.js';
import {Task} from '../task/task';
import {TaskList} from '../task/task.list';
import {TaskForm} from '../task/task.form';
import {TaskService} from '../task/task.service';
import {Observable}     from 'rxjs/Rx';
//import io from 'socket.io/socket.io.js';
import * as _ from 'lodash/lodash.js'
import {HTTP_PROVIDERS} from 'angular2/http';

@Component({
    selector: 'app',
    templateUrl: '/components/app/app.html',
    styles: ['a { cursor: pointer; cursor: hand; }'],
    directives: [TaskList, TaskForm],
    providers: [TaskService, Leto, Time, HTTP_PROVIDERS]
})

export class AppComponent {
    //tasks: Observable<Task[]>
    tasks = []
    time: Observable<number>
   
    addTask(task: Task) {
        this._taskService.add(task);
    }

    //  public newTask = { done: false, id: uuid() };

    constructor(public leto: Leto, public _time: Time, private _taskService: TaskService, private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.getTime()
        this.getTasks()
    }
    getTasks() {
         this._taskService.get().subscribe(data =>{
          let x = data.concat(this.tasks)
           x  = _.uniqBy(x, "id")
           this.tasks = x.sort((a, b)=>{return a.name.localeCompare(b.name)})
           
        })
    }
    getTime() {
        this.time = this._time.getTime()

    }
}


