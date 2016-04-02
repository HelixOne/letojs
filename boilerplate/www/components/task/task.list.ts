import {Component, Input} from 'angular2/core';
import {Task} from './task';
import {TaskService} from './task.service';
@Component({
  selector: 'task-list',
  styles: [`
    .done-true {
      text-decoration: line-through;
      color: grey;
    }`
  ],
  template: `
    <ul class="list-unstyled">
      <li *ngFor="#task of tasks">
        <input type="checkbox" [(ngModel)]="task.done" (click)="toggleDone($event, task)">
        <span class="done-{{task.done}}">{{task.name}}</span>
      </li>
    </ul>`,
    providers:[TaskService]

})
export class TaskList {
  @Input() tasks;
   constructor(private _taskService: TaskService) {}
   
    toggleDone(e, task){
        //e.preventDefault()
        task.done = !task.done;
        this._taskService.add(task)
        console.log(task.done)
    }
    
}