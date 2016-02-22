import {Injectable} from 'angular2/core';
import platform from 'platform/platform.js';
@Injectable()
export class Leto {
    platform: string;
    appVersion: string;
    
    os: string;
    appName: string;
    constructor() {
        const osMatch = {
            'Windows NT': 'Windows',
            'Win32': 'Windows'
        }
        this.appVersion = '0.0.1';
        this.platform = 'browser';
        if (window.process && window.process.versions && window.process.versions.electron) {
            this.platform = 'electron'
        }
        console.log(platform)
        this.os = osMatch[platform.os.family] || platform.os.family;
        this.appName = 'Leto App'
    }

}
