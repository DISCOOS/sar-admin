import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { URLSearchParams } from "@angular/http"
import { CONFIG } from '../shared/config';
import { Mission } from '../models/models';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/models';
import { SARUser } from '../models/models';

import 'rxjs/add/operator/mergeMap';
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
		private http: Http
	) {

	}


	private _configureOptions(options: RequestOptions) {

		let headers = new Headers();
		//headers.append('Authorization', localStorage.getItem("token"));
		//console.log(localStorage.getItem("token"))
		headers.append('Content-Type', 'application/json');
		options.headers = headers;
	}



	login(username: string, password: string) {
		let data = new URLSearchParams();
		data.append('username', username);
		data.append('password', password);




		let options = new RequestOptions({ withCredentials: true })
		return this.http
			.post(baseUrl + '/sarusers/login', data, options)
			.map((response: Response) => {

				// login successful if there's a token in the response
				let res = response.json();

				let isAdmin = (res.user.user.privileges & 256) == 256;





				if (res.user.user && isAdmin && res.user.access_token) {
					// store user details and token in local storage to keep user logged in between page refreshes

					console.log(res.user.user)
					localStorage.setItem('currentUser', JSON.stringify(res.user.user));
					this.loggedIn = true;
					this.isLoggedIn.next(this.loggedIn);
				}
			})

			.catch(this.handleError)
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
		//localStorage.removeItem('token');
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

		let options = new RequestOptions({ withCredentials: true })
		this._configureOptions(options);

		let body = JSON.stringify(mission, this._replacer);

		console.log(body);

		return this.http
			.post(baseUrl + '/missions', body, options)
			.map(res => res.json().data)
			.catch(this.handleError)
	}

	/**
	 * Get missions 
	 */

	getMissions(limit?: number) {
		let options = new RequestOptions({ withCredentials: true })
		this._configureOptions(options);

		let url = baseUrl + '/missions';

		let returnMissions: any;
		//this._spinnerService.show();
		
				return this.http.get(url, options)
					.map((response: Response) => <Mission[]>response.json())
					.catch(this.handleError)
					
		//  .finally(() => this._spinnerService.hide());
		
		
		/*
				return this.http.get(url, options)
					.map((res: Response) => {
						returnMissions = res.json()
						console.log(returnMissions)
						return returnMissions
					})
					.flatMap((returnMissions) =>
		
		
						this.http.get(url + '/1/sARUser'))
					.map((saruser: Response) => {
		
		
						returnMissions.forEach(miss => {
							miss.creator = saruser.json()
						});
		
						return returnMissions
		
					})
					*/
	}

	/*
	Get single mission by Id.
	Map SAR-user to this mission as well.
	*/

	getMission(id: number) {
		let options = new RequestOptions({ withCredentials: true })
		this._configureOptions(options);

		let url = baseUrl + "/missions/" + id;
		let mission: any;

		return this.http.get(url, options).map((res: Response) => {
			mission = res.json()
			return mission
		})
			.flatMap((mission) => this.http.get(url + '/sARUser'))
			.map((saruser: Response) => {
				mission.creator = saruser.json()
				return mission
			})

	}


	updateMission(mission: Mission) {
		return Observable.of("")
	}

	/*
	Deletes a mission by ID
	TOdo: Throw error if invalid user
	*/
	deleteMissionById(mission : Mission) {
		if (!mission) return;

		// Check if user is same as the one who created this mission
		let currentUser = JSON.parse(localStorage.getItem('currentUser'))
		
		if(currentUser.id != mission.creator.id) 
		return;
		// throw error


		let options = new RequestOptions({ withCredentials: true })
		let url = baseUrl + '/missions/' + mission.id;
		this._configureOptions(options);
		return this.http
			.delete(url, options)
			.catch(this.handleError)

	}








	/**
	 * Gets people associated with this user
	 */
	getPeople(limit?: number) {
		// COOKIE NOT SENT IF THIS IS NOT SET
		let options = new RequestOptions({ withCredentials: true })

		this._configureOptions(options);

		let url = baseUrl + '/sarusers/persons';
		//this._spinnerService.show();

		return this.http.get(url, options)
			.map((response: Response) => <SARUser[]>response.json().persons)

		//.catch(this.handleError)
		//  .finally(() => this._spinnerService.hide());

	}








}