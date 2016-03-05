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
        <input type="checkbox" [(ngModel)]="task.done">
        <span class="done-{{task.done}}">{{task.name}}</span>
        <span>{{task.id}}</span>
      </li>
    </ul>`,

})
export class TaskList {
  @Input() tasks: Task[];
   constructor(ts: TaskService) {}
}