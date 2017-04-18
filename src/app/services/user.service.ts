import { User } from '../models/user';
import {Injectable}      from '@angular/core'
import { Observable } from 'rxjs/Observable';
 import { URLSearchParams } from "@angular/http"
import { Http, Response } from '@angular/http';
import {Subject} from 'rxjs/Subject';
import { CONFIG } from '../shared/config';

let baseUrl = CONFIG.urls.baseUrl;


@Injectable()
export class UserService {
  loggedIn : boolean;

  // Other components can subscribe to this 
  public isLoggedIn:Subject<boolean> = new Subject();


  constructor(private http: Http) {

  }


     login(username: string, password: string) {
        let data = new URLSearchParams();
         data.append('username', username);
          data.append('password', password);
     
        return this.http
        .post(baseUrl + '/token', data)
        .map((response: Response) => {
              
                // login successful if there's a token in the response
                let user = response.json();

                if (user.user && user.access_token) {
                    // store user details and token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.user));
                        this.loggedIn = true;
                        this.isLoggedIn.next(this.loggedIn);
                    
                }
            })
        .catch(this.handleError)     
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
            this.loggedIn = false;
    this.isLoggedIn.next(this.loggedIn);
    }

      /**
   * Catches http errors
   * @param error 
   */
  private handleError(error: Response) {
    let msg = `Status ${error.status}, url: ${error.url}`;
    console.error(msg);
    return Observable.throw(msg || 'Server error');
  }


}
