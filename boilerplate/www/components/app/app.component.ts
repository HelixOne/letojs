import {Component} from 'angular2/core';
import {Leto} from '../leto/Leto';
import {Time} from '../time/time';
import {TaskService} from '../task/task.service';


@Component({
    selector: 'app',
    template: `<h1>App:<strong>{{leto.appName}}</strong></h1>
    			<h2>Version: {{leto.appVersion}}</h2>
    			<p>Platform: {{leto.platform}}</p>
    			<p>OS: {{leto.os}}</p>
                <p>Server Time: {{time.time}}
                <hr />
                <form>
                <input type="text" [(ngModel)]="newTask.name" />
        <input type="submit" class="btn btn-success"(click)="addTask(newTask)"  />
        </form>
        <table class="table-striped">
            <thead>
                <tr>
                    <th>Task</th>
                    <th>Status</th>
                    <th></th>
                </tr>
            </thead>    
            <tbody>
                <tr *ngFor="#task of tasks">
                    <td>{{task.name }} </td>
        <td><span [class.done]="task.done">{{task.done ? 'DONE' : 'I\\'M WORKING ON IT'}} </span></td>
                    <td><button class="btn btn-primary" (click)="task.done = !task.done">{{task.done ? 'Undo' : 'Done'}}</button></td>
                </tr>
            </tbody>
    			`,
                    providers: [TaskService]


})
export class AppComponent {
    public tasks = [];
    public newTask = { done: false };

    constructor(private _taskService: TaskService, public leto: Leto, public time: Time) {

       
    }
 ngOnInit(){
            this.getTasks();
        }

        getTasks(){
            this._taskService.getTasks().then(tasks => this.tasks = tasks);
        }

        addTask(task){
            if (task) {
                this._taskService.addTask(task);
                this.newTask = { done: false };
            }
        }
}