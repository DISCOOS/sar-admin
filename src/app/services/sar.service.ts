import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { CONFIG } from '../shared/config';
import { Mission, Alarm, MissionResponse, Expence } from '../models/models';
import { Subject } from 'rxjs/Subject';
import { SARUser } from '../models/models';
import { UserService } from '../services/user.service';
import { ExceptionService } from '../services/exception.service';
import { SpinnerService } from '../blocks/blocks';
import { NotificationService } from '../services/notification.service';

const BASE_URL = CONFIG.sar_api.BASE_URL;


@Injectable()
export class SARService {

	constructor(
		private http: Http,
		private userService: UserService,
		private exceptionService: ExceptionService,
		private spinnerService: SpinnerService,
		private notificationService: NotificationService

	) {

	}


	private _configureOptions(options: RequestOptions) {
		const headers = new Headers();
		headers.append('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem("currentUser")).access_token);
		headers.append('Content-Type', 'application/json; charset=utf-8');
		options.headers = headers;
	}



	login(username: string, password: string) {

		const data = new URLSearchParams();
		data.append('username', username);
		data.append('password', password);

		const options = new RequestOptions({ withCredentials: true })

		this.spinnerService.show();
		return this.http
			.post(BASE_URL + '/sarusers/login', data, options)
			.map((response: Response) => {

				// login successful if there's a token in the response
				let res = response.json();
				if (
					res.user
					// && res.user.isAdmin
					&& res.user.access_token
				) {
					if (res.user.isAdmin) {
						// store user details and token in local storage to keep user logged in between page refreshes					
						localStorage.setItem('currentUser', JSON.stringify(res.user));

						//	this.userService.user = res.user;
						// 	console.log("set user in userservice" + this.userService.user)
					}
					else {
						return Observable.throw(new Error("Ingen admintilgang"))
					}
				} else {
					return Observable.throw(new Error("error"))
				}
			})

			.catch(this.exceptionService.catchBadResponseFromLogin)
			.finally(() => this.spinnerService.hide())
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
	}




	getSaruserFromId(id: number) {
		const options = new RequestOptions({ withCredentials: true })
		this._configureOptions(options);


		return this.http.get(BASE_URL + '/sarusers/' + id, options)
			.map((response: Response) => {

				return response.json();
			})
			.catch(this.exceptionService.catchBadResponse)
			.finally(() => this.spinnerService.hide())
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

		const options = new RequestOptions({ withCredentials: true })
		this._configureOptions(options);

		let missionbody = JSON.stringify(mission, this._replacer);
		let alarmbody = JSON.stringify(alarm, this._replacer);
		let attendantsbody = []
		let missionId;

		const url = BASE_URL + '/missions';
		this.spinnerService.show();
		return this.http.post(url, missionbody, options)
			.do(res => { missionId = res.json().id; console.log('Process mission: ' + res.url) })
			.concatMap(res => {
				console.log('Posted mission ' + res.url)
				return this.http.post(url + '/' + res.json().id + '/alarms', alarmbody, options)
			})
			.do(res => console.log('Posted alarms: ' + res.url))
			.concatMap(res => {
				people.forEach(a => {
					const attendant = {
						sarUserId: a.id,
						missionId: missionId
					};
					attendantsbody.push(attendant);
				});
				console.log("attendantsbody " + JSON.stringify(attendantsbody))
				return this.http.post(BASE_URL + '/attendants', attendantsbody, options)
			})

			.do(res => {
				console.log("Posted attendants " + res.url)
			})
			.concatMap((res: Response) => {
				return this.notificationService.sendPushNotifications(mission.isEmergency, missionId, mission.title, alarm.message);
			})
			.do(res => console.log('Posted notifications'))
			.catch(this.exceptionService.catchBadResponse)
			.finally(() => this.spinnerService.hide());

	}
	/**
	 * Adds a new alarm for an existing mission + add notifications
	 * @param mission Mission to add alarm for
	 */
	addAlarm(mission: Mission, alarm: Alarm) {
		const options = new RequestOptions({ withCredentials: true });
		this._configureOptions(options);
		//JSON.stringify(alarm, this._replacer);
		const alarmbody = {
			date : alarm.date,
			message : alarm.message,
			missionId: alarm.mission.id
		}
		let attendantsbody = []
		let alarmId;

		this.spinnerService.show();
		return this.http
			.post(BASE_URL + '/missions/' + mission.id + '/alarms', alarmbody, options)
			.do(res => { alarmId = res.json().id; console.log('Posted alarm for mission: ' + res.url) })
			.concatMap(res => {
				return this.notificationService.sendPushNotifications(mission.isEmergency, alarm.mission.id,alarm.mission.title, alarm.message);
			})
			.do(res => console.log('Posted notifications'))
			.catch(this.exceptionService.catchBadResponse)
			.finally(() => this.spinnerService.hide());
	}

	/**
	 * Get missions 
	 */

	getMissions() {
		const options = new RequestOptions({ withCredentials: true })
		this._configureOptions(options);

		let url = BASE_URL + '/missions';

		this.spinnerService.show();
		return this.http
			.get(url, options)
			.map((response: Response) => <Mission[]>response.json())
			.catch(this.exceptionService.catchBadResponse)
			.finally(() => this.spinnerService.hide());
	}

	getMissionExpences(mission: Mission) {
		const options = new RequestOptions({ withCredentials: true })
		this._configureOptions(options);
		const url = BASE_URL + '/expences?filter[where][missionId]=' + mission.id;
		this.spinnerService.show();
		return this.http
			.get(url, options)
			.map((response: Response) => <Expence[]>response.json())
			.catch(this.exceptionService.catchBadResponse)
			.finally(() => this.spinnerService.hide());
	}




	getMissionResponses(missionId: number) {
		const options = new RequestOptions({ withCredentials: true })
		this._configureOptions(options);

		let url = BASE_URL + '/MissionResponses?filter[where][missionId]=' + missionId + '&filter[include]=saruser&filter[include]=tracking';

		this.spinnerService.show();
		return this.http.get(url, options)
			.map((response: Response) => {
				// 				console.log(<SARUser[]>response.json().persons)
				return <MissionResponse[]>response.json()
			})
			// .do(res => console.log("Result of : " + res))
			.catch(this.exceptionService.catchBadResponse)
			.finally(() => this.spinnerService.hide());


	}
	/*
	Get single mission by Id.
	Map SAR-user to this mission as well.
	*/

	getMission(id: number) {
		const options = new RequestOptions({ withCredentials: true })
		this._configureOptions(options);

		let url = BASE_URL + "/missions/" + id + "?filter[include]=alarms"; // Also include alarms in response
		let mission: any;

		this.spinnerService.show();
		return this.http.get(url, options).map((res: Response) => {
			mission = res.json()
			return mission
		})
			// Here we also map creator of this mission to the reponse
			.flatMap((mission) => this.http.get(BASE_URL + '/missions/' + id + '/sARUser', options))
			.map((saruser) => {
				mission.creator = saruser.json()
				return mission
			})
			.flatMap((mission) => this.http.get(BASE_URL + '/missions/' + id + '/expenses', options))
			.map((expenses) => {
				if (!mission.isActive) {
					mission.expenses = expenses.json()
				}
				console.log(mission)
				return mission
			})
			.catch(this.exceptionService.catchBadResponse)
			.finally(() => this.spinnerService.hide());

	}


	updateMission(mission: Mission) {
		return Observable.of("")
	}

	/*
	Deletes a mission by ID
	TOdo: Throw error if invalid user
	*/
	deleteMissionById(mission: Mission) {

		const options = new RequestOptions({ withCredentials: true })

		this._configureOptions(options);
		// Check if user is same as the one who created this mission
		let currentUser = JSON.parse(localStorage.getItem('currentUser'))

		if (mission && currentUser && currentUser.id != mission.creator.id) {
			console.log("error deleting mission")
			// throw error instead
		}


		let url = BASE_URL + '/missions/' + mission.id;
		this.spinnerService.show();
		return this.http
			.delete(url, options)
			.catch(this.exceptionService.catchBadResponse)
			.finally(() => this.spinnerService.hide());


	}

	setMissionAsInactive(mission: Mission) {

		const options = new RequestOptions({ withCredentials: true })
		this._configureOptions(options);
		// Check if user is same as the one who created this mission
		let currentUser = JSON.parse(localStorage.getItem('currentUser'))

		if (mission && currentUser && currentUser.id != mission.creator.id) {
			console.log("error setting  mission as inactive. only the same user who created it can do that")
			// throw error instead
		}

		const body = {
			"isActive": false,
			"isEmergency": mission.isEmergency,
			'title': mission.title,
			"description": mission.description,
			'dateStart': mission.dateStart,
			'dateEnd': new Date(),
			'meetingPoint': mission.meetingPoint,
			'meetingPointNicename': mission.meetingPointNicename,
			'creator': mission.creator.id
		}


		let url = BASE_URL + '/missions/' + mission.id;
		this.spinnerService.show();
		return this.http
			.put(url, body, options)
			.do(res => console.log('Result of : ' + res.json()))
			.catch(this.exceptionService.catchBadResponse)
			.finally(() => this.spinnerService.hide());

	}




	/**
	 * Gets people associated with this user (people who this SAR-user can send alarms to)
	 */
	getPeople(limit?: number) {
		console.log('----get people-----')
		// COOKIE NOT SENT IF THIS IS NOT SET
		const options = new RequestOptions({ withCredentials: true })

		this._configureOptions(options);

		let url = BASE_URL + '/sarusers/persons';


		this.spinnerService.show();
		return this.http.get(url, options)
			.map((response: Response) => {
				// 				console.log(<SARUser[]>response.json().persons)
				return <SARUser[]>response.json().persons
			})

			.catch(this.exceptionService.catchBadResponse)
			.finally(() => this.spinnerService.hide());

	}




	getSARUser(id: number) {
		const options = new RequestOptions({ withCredentials: true })
		this._configureOptions(options);

		let url = BASE_URL + '/SARUsers/' + id;
		this.spinnerService.show();
		return this.http
			.get(url, options).map((res: Response) => {
				return res.json()
			})
			.catch(this.exceptionService.catchBadResponse)
			.finally(() => this.spinnerService.hide());
	}







	/**********************
	 * Private methods
	 ***********************/
	/**
	 * Catches http errors
	 * @param error
	 */
	private _handleError(error: Response) {
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
		if (key === 'id') return undefined;
		else return value;
	}



}