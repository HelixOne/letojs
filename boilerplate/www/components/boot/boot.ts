import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from '../app/app.component'
import {HTTP_PROVIDERS} from 'angular2/http';
import {Leto} from '../leto/Leto';
import {Time} from '../time/time';

bootstrap(AppComponent, [HTTP_PROVIDERS, Leto, Time]);
