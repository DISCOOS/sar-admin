import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';
import { URLSearchParams } from "@angular/http"
import { CONFIG } from '../shared/config';
import { Mission, Alarm, MissionResponse } from '../models/models';
import { Subject } from 'rxjs/Subject';
import { User } from '../models/models';
import { SARUser } from '../models/models';
import { UserService } from '../services/user.service';
import { ExceptionService } from '../services/exception.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/do';

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
		private userService: UserService,
		private exceptionService: ExceptionService

	) {

	}


	private _configureOptions(options: RequestOptions) {
		let headers = new Headers();
		headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem("currentUser")).access_token);
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
				//	let isAdmin = (res.user.user.privileges & 256) == 256;
				if (
					res.user
					//&& res.user.isAdmin
					&& res.user.access_token
				) {
					// store user details and token in local storage to keep user logged in between page refreshes					
					localStorage.setItem('currentUser', JSON.stringify(res.user));

					this.userService.user = res.user;

					this.loggedIn = true;
					this.isLoggedIn.next(this.loggedIn);
				} else {

					return Observable.throw(new Error("error"))
				}
			})

			.catch(this.exceptionService.catchBadResponse)
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





	/**
	 * 
	 * Uses concatmap for multiple post requests which depends on eachother. 
	 * That means that each post-request must get an 
	 * OK-response before the next one is executed.
	 * 
	 * @param mission : The mission to add
	 * @param alarm	  : An alarm for this mission
	 * @param people  : Array of sarusers for this alarm
	 */
	addMission(mission: Mission, alarm: Alarm, people: SARUser[]) {

		let options = new RequestOptions({ withCredentials: true })
		this._configureOptions(options);

		let missionbody = JSON.stringify(mission, this._replacer);
		let alarmbody = JSON.stringify(alarm, this._replacer)
		let peoplebody = []

		let url = baseUrl + '/missions';

		return this.http.post(url, missionbody, options)
			.do(res => console.log("Process mission: " + res.url))
			.concatMap(res => {
				console.log("Mission respons", res.url, ' poster alarm: ')
				return this.http.post(url + '/' + res.json().id + '/alarms', alarmbody, options)
			})
			.concatMap(res => {
				//console.log("Alarm respons", res.url, ' poster alarmusers: ')
				
				let alarmId = res.json().id
				people.forEach(u => {
					let user = {
						sarUserId: u.id,
						alarmId: alarmId
					}
					peoplebody.push(user)
				});
				return this.http.post(baseUrl + '/alarmusers', peoplebody, options)
			})
			.do(res => {
			//	console.log("AlarmUsers response:" + res.url)
			})
			.catch(this.exceptionService.catchBadResponse)
	}


	/*
	Add a new alarm
	*/
	addAlarm(alarm: Alarm, missionId: number) {

		let options = new RequestOptions({ withCredentials: true })
		this._configureOptions(options);

		let body = {
			"date": new Date(),
			"message": alarm.message,
			"missionId": missionId
		}

		//		let body = JSON.stringify(alarm, this._replacer);

		console.log(body);

		return this.http
			.post(baseUrl + '/alarms', body, options)
			.map(res => res.json())
			.catch(this.exceptionService.catchBadResponse)
	}
	/**
	
	 * @param alarmId : which alarm to associate the sar-users with.
	 * @param users : Array of sar-users to be associated with this alarm
	 */
	addAlarmUsers(alarmId, users: SARUser[]) {

		let options = new RequestOptions({ withCredentials: true })
		this._configureOptions(options);

		let body = [];
		users.forEach(u => {
			let user = {
				sarUserId: u.id,
				alarmId: alarmId
			}
			body.push(user)
		});

		return this.http
			.post(baseUrl + '/AlarmUsers', body, options)
			.map(res => res.json().data)
			.catch(this.exceptionService.catchBadResponse)
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
			.catch(this.exceptionService.catchBadResponse)

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


	getMissionResponses(missionId: number) {
		// http://0.0.0.0:3000/api/MissionResponses?filter[where][missionId]=1&filter[include]=saruser

		let options = new RequestOptions({ withCredentials: true })
		this._configureOptions(options);

		let url = baseUrl + '/MissionResponses?filter[where][missionId]=' + missionId + '&filter[include]=saruser';
		//this._spinnerService.show();

		return this.http.get(url, options)
			.map((response: Response) => {
				//				console.log(<SARUser[]>response.json().persons)
				return <MissionResponse[]>response.json()
			})

			.catch(this.exceptionService.catchBadResponse)
		//  .finally(() => this._spinnerService.hide());


	}
	/*
	Get single mission by Id.
	Map SAR-user to this mission as well.

	*/

	getMission(id: number) {
		let options = new RequestOptions({ withCredentials: true })
		this._configureOptions(options);

		let url = baseUrl + "/missions/" + id + "?filter[include]=alarms"; // Also include alarms in response
		let mission: any;

		return this.http.get(url, options).map((res: Response) => {
			mission = res.json()
			return mission
		})
			// Here we also map SAR-user of this mission to the reponse
			.flatMap((mission) => this.http.get(baseUrl + '/missions/' + id + '/sARUser', options))
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
	deleteMissionById(mission: Mission) {

		// Check if user is same as the one who created this mission
		let currentUser = JSON.parse(localStorage.getItem('currentUser'))

		if (mission && currentUser && currentUser.id != mission.creator.id) {
			console.log("error deleting mission")
			// throw error instead
		}

		let options = new RequestOptions({ withCredentials: true })
		let url = baseUrl + '/missions/' + mission.id;
		this._configureOptions(options);
		return this.http
			.delete(url, options)
			.catch(this.exceptionService.catchBadResponse)

	}








	/**
	 * Gets people associated with this user (people who this SAR-user can send alarms to)
	 */
	getPeople(limit?: number) {
		console.log("----get people-----")
		// COOKIE NOT SENT IF THIS IS NOT SET
		let options = new RequestOptions({ withCredentials: true })

		this._configureOptions(options);

		let url = baseUrl + '/sarusers/persons';
		//this._spinnerService.show();

		return this.http.get(url, options)
			.map((response: Response) => {
				//				console.log(<SARUser[]>response.json().persons)
				return <SARUser[]>response.json().persons
			})

			.catch(this.exceptionService.catchBadResponse)
		//  .finally(() => this._spinnerService.hide());

	}








}