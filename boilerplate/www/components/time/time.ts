import {Injectable, NgZone} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import io from 'socket.io/socket.io.js';


@Injectable()
export class Time {
    time: number;
    constructor(http: Http, private _ngZone: NgZone) {
        let route = '/api/time';
        http.get(route).subscribe( (data) => {
            console.log('TIme',data)            
            var socket = io(route);
            socket.on('time', (data) => {
                this._ngZone.runOutsideAngular(() => {
                    this.time = data.time
                    this._ngZone.run(() => {});

                })
            });
        })
    }
}
    
    
     
