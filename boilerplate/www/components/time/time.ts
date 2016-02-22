import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';


@Injectable()
export class Time {
    time: number;
    constructor(http: Http) {
        let route = '/api/time';
        http.get(route).subscribe(function (data) {
            console.log('TIme',data)            
            var socket = io(route);
            socket.on('time', (data) => {
                this.time = data.time
            });
        })
    }
}
    
    
     
