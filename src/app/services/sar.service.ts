import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { URLSearchParams } from "@angular/http"
import { CONFIG } from '../shared/config';


let baseUrl = CONFIG.urls.baseUrl;


@Injectable()
export class SARService {
	
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
                }
            })
        .catch(this.handleError)



          
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

	private _createAuthorizationHeader(headers: Headers) {
		headers.append('Authorization', 'Bearer ');
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

	/**
	 * Get alarms 
	 */
	getMissions() {

	}




	/**
	 * Filter out ID from JSON-object. 
	 * @param key 
	 * @param value 
	 */
	private _replacer(key, value) {
		if (key == "ID") return undefined;
		else return value;
	}



}