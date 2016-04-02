import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable, Subject}     from 'rxjs/Rx';

import io from 'socket.io/socket.io.js';


@Injectable()
export class Time {
    time: number;
    
    constructor() {}
    
    getTime() {
        let route = '/api/time';
        var socket = io(route);
        return Observable.fromEvent(socket, 'time')
                .map((data: { time: number }) => data.time)

    }
} 