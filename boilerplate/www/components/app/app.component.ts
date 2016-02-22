import {Component} from 'angular2/core';
import {Leto} from '../leto/Leto';
import {Time} from '../time/time';

@Component({
    selector: 'app',
    template: `<h1>App:<strong>{{leto.appName}}</strong></h1>
    			<h2>Version: {{leto.appVersion}}</h2>
    			<p>Platform: {{leto.platform}}</p>
    			<p>OS: {{leto.os}}</p>
                <p>Server Time: {{time.time}}
    			`

})
export class AppComponent { 
	constructor(public leto:Leto, public time:Time){

	}

}