import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { URLSearchParams } from "@angular/http"
import { CONFIG } from '../shared/config';
import { Mission } from '../models/models';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/models';
import { SARUser } from '../models/models';
import { Router } from '@angular/router';
let baseUrl = CONFIG.urls.baseUrl;
let token = CONFIG.headers.token;


declare var google: any;

@Injectable()
export class SARService {

	loggedIn: boolean;
	token: string;

	// Other components can subscribe to this 
	public isLoggedIn: Subject<boolean> = new Subject();

	constructor(
		private http: Http,
		private router: Router
	) {

	}


	private _createAuthHeaders(headers: Headers) {
		headers.append('Authorization', 'Bearer ' + this.token);
		headers.append('Content-Type', 'application/json');
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
					console.log("new token set")
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
		if (error.status == 401) {
			
		}
		let msg = `Status ${error.status}, url: ${error.url}`;
		console.error(msg);
		return Observable.throw(msg || 'Server error');
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












	addMission(mission: Mission) {

		let headers = new Headers();
		this._createAuthHeaders(headers);

		let body = JSON.stringify(mission, this._replacer);

		console.log(body);


		return this.http
			.post(baseUrl + '/missions', body, { headers: headers })
			.map(res => res.json().data)
			.catch(this.handleError)
	}

	/**
	 * Get missions 
	 */

	getMissions(limit?: number) {
		let headers = new Headers();
		this._createAuthHeaders(headers);

		let url = baseUrl + '/missions';
		//this._spinnerService.show();

		return this.http.get(url, { headers: headers })
			.map((response: Response) => <Mission[]>response.json())
			.catch(this.handleError)
		//  .finally(() => this._spinnerService.hide());
	}




	/*
	Get single mission by Id
	*/

	getMission(id: number) {
		let headers = new Headers();
		this._createAuthHeaders(headers);
		let url = baseUrl + "/missions/" + id;

		return this.http.get(url, { headers: headers })
			.map((response: Response) => response.json())
			.catch(this.handleError);
	}







	getPeople(limit?: number) {
		let headers = new Headers();
		this._createAuthHeaders(headers);

		let url = baseUrl + '/kova/persons';
		//this._spinnerService.show();

		return this.http.get(url, { headers: headers })
			.map((response: Response) => <SARUser[]>response.json())
			//	.map((response: Response) => this._mapPeopleFromJSON(response.json()))
			.catch(this.handleError)
		//  .finally(() => this._spinnerService.hide());

	}





}