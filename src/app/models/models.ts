export class User {
	id: number;
	email: string;
	name: string;
	organization: string;
}


export class SARUser {
	
	constructor(
		id: number, 
		hasApp : boolean,
		isAdmin : boolean,
		email: string,
		phone: number,
		name: string,
		organization: string,
		isAvailable: boolean,
		isTrackable: boolean
	) { }

}



export class Mission {
	constructor(
		id: number,
		isActive: boolean,
		isEmergency: boolean,
		title: string,
		description: string,
		dateStart: Date,
		dateEnd: Date,
		alarms: Alarm[],
		meetingPoint: string, // geolocation { lat, lng }
		meetingPointNicename: string, // converted geolocation to nicename
		creator: SARUser,
		expences: Expence[]
	) { }

}


export class Alarm {
	id: number;

	// datestamp at creation
	date: Date;


	message: string;
	mission: Mission;

	// Persons to be alarmed
	persons: SARUser[];
	alarmResponses: AlarmResponse[];
}


export class AlarmResponse {
	alarm: Alarm;
	person: SARUser;
	response: boolean;
	date: number;  // Autogenerated time of response
	comment: string;

	// If user has tracking enabled
	trackings: Tracking[];
}

export class Tracking {
	alarmResponse: AlarmResponse;
	positionLat: string;
	positionLong: string;
	date: number;

}


export class Expence {
	id: number;
	title: string;
	description: string;
	amount: number;
	mission: Mission;
	person: SARUser;
}