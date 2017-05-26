import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {

    //public user: any;
    constructor( @Optional() @SkipSelf() prior: UserService) {
        if (prior) {
            console.log('userservice already exists');
            return prior;
        } else {
            console.log('created userservice')
        }
    }

    get user() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
}