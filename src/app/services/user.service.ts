import { User } from '../models/user';
import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

/**
Global user var

**/
@Injectable()
export class UserService {
  user: User;

  // Observable navItem source
  private _userSource = new BehaviorSubject<User>(null);
  // Observable navItem stream
  userItem$ = this._userSource.asObservable();

  setUser(user : User) {
    this.user = user;
    this._userSource.next(user);
  }
}
