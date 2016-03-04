import {Task} from './task';
import uuid from 'uuid-v4/index.js';

export var TASKS: Task[] = [
    {
        name: 'The is a task',
        done: false,
        id: uuid()
    },
    {
        name: 'Yet another task',
        done: true,
        id: uuid()
     
    }
];
