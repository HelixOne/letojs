import {Component, Output, EventEmitter} from 'angular2/core';
import {Task} from './task';
import uuid from 'uuid-v4/index.js';
import {TaskService} from './task.service';

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
  task: string = '';   
  constructor(private _taskService: TaskService) {}

  addTask() {
      
    if (this.task) {
     let nt = {
         name:this.task,
         fresh:true,
         done:false, 
         id:uuid()}
    this._taskService.add(nt)
    }
    this.task = '';
  }
  
}