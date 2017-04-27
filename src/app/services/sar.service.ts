import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { URLSearchParams } from "@angular/http"
import { CONFIG } from '../shared/config';
import { Mission } from '../models/models';
import {Subject} from 'rxjs/Subject';
import { User } from '../models/models';

let baseUrl = CONFIG.urls.baseUrl;
let token = CONFIG.headers.token;


@Injectable()
export class SARService {

	loggedIn : boolean;
	token : string;

  // Other components can subscribe to this 
  public isLoggedIn:Subject<boolean> = new Subject();
	
	constructor(private http: Http) {
	}


	private _creatAuthHeaders(headers: Headers) {
		console.log("TOKen: " + this.token);
		headers.append('Authorization', 'Bearer ' + this.token);
	}



     login(username: string, password: string) {
        let data = new URLSearchParams();
         data.append('username', username);
          data.append('password', password);
     
        return this.http
        .post(baseUrl + '/kova/login', data)
        .map((response: Response) => {
              
                // login successful if there's a token in the response
                let user = response.json();

                if (user.user && user.access_token) {
                    // store user details and token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.user));
                        this.loggedIn = true;
                        this.isLoggedIn.next(this.loggedIn);
                    	this.token = user.access_token;
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

	addMission(mission: Mission) {

		let headers = new Headers();
		this._creatAuthHeaders(headers);


		let body = 

{
    "isActive": true,
    "isEmergency": true,
    "title": 'sdfsdfsdfsfd',
    "description": 'sdfsdfsdfsdfs',
    "dateStart": null,
    "dateEnd": null,
    "meetingPoint": null,
    "sARAdminId": null,
    "creatorId": null
  };

  //JSON.stringify(body, this._replacer);

		console.log(body)

		return this.http
			.post(baseUrl + '/missions' , body, { headers: headers })
			.map(res => res.json().data)
			.catch(this.handleError)



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
		if (key == "id") return undefined;
		else return value;
	}



}