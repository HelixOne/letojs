import {Component, Output, EventEmitter} from 'angular2/core';
import {Task} from './task';
import uuid from 'uuid-v4/index.js';
@Component({
  selector: 'task-form',
  template: `
    <form (ngSubmit)="addTask()">
      <input type="text" [(ngModel)]="task" size="30"
             placeholder="add new task here">
      <input class="btn-primary" type="submit" value="add">
    </form>`
})
export class TaskForm {
  @Output() newTask = new EventEmitter<Task>();
  task: string = '';
  addTask() {
    if (this.task) {
      this.newTask.next({name:this.task, done:false, id:uuid()});
    }
    this.task = '';
  }
}