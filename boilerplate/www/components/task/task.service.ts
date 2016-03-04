import {Injectable} from 'angular2/core';
import {TASKS} from './task.mock';

@Injectable()
export class TaskService{
    getTasks(){
        return Promise.resolve(TASKS);
    }
    
    addTask(task){
        TASKS.push(task);
    }
}
