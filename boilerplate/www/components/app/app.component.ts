import {Component} from 'angular2/core';
import {Leto} from '../leto/Leto';
import {Time} from '../time/time';
import uuid from 'uuid-v4/index.js';
import {Task} from '../task/task';
import {TaskList} from '../task/task.list';
import {TaskForm} from '../task/task.form';
import {TaskService} from '../task/task.service';


@Component({
    selector: 'app',
    template: `<h1>App:<strong>{{leto.appName}}</strong></h1>
    			<h2>Version: {{leto.appVersion}}</h2>
    			<p>Platform: {{leto.platform}}</p>
    			<p>OS: {{leto.os}}</p>
                <p>Server Time: {{time.time}}
                <hr />    
    <h2>Task</h2>
    <task-list [tasks]="taskService.tasks"></task-list>
    <task-form (newTask)="addTask($event)"></task-form>`,
    styles: ['a { cursor: pointer; cursor: hand; }'],
    directives: [TaskList, TaskForm],
    providers:[TaskService]




})
export class AppComponent {
    tasks: Task[] = []
    addTask(task: Task) {
        this.taskService.add(task);
    }

    public newTask = { done: false, id: uuid() };

    constructor( public leto: Leto, public time: Time, public  taskService:TaskService) {

    }
   
}
