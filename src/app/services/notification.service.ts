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


@Injectable()
export class NotificationService {
    constructor(
        private http: Http,
        private exceptionService: ExceptionService,
        private spinnerService: SpinnerService,

    ) { }

    private _configureOptions(options: RequestOptions) {
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + CONFIG.ionic.API_TOKEN);
        headers.append('Content-Type', 'application/json');
        options.headers = headers;
    }
    /**
     * 
     * @param isEmergency : If this is true, everyone will receive push notification
     */
    sendPushNotifications(sendToAll: boolean, mission: Mission, message: string, usersToNotify?: SARUser[]) {

        const options = new RequestOptions();
        this._configureOptions(options);

        const tokens = this._makeDeviceTokenArrayFromUsers(usersToNotify);
        const body = {
            'tokens': tokens,
            'profile': CONFIG.ionic.API_PROFILE,
            'send_to_all': sendToAll, // Send notification to all if emergency
            'notification': {
                'title': mission.title,
                'message': message
            }
        };

        this.spinnerService.show();
        return this.http
            .post(CONFIG.ionic.API_URL + '/push/notifications', body, options)
            .map(res => res.json().data)
            .catch(this.exceptionService.catchBadPushResponse)
            .finally(() => this.spinnerService.hide());
    }

    private _makeDeviceTokenArrayFromUsers(users: SARUser[]) {
        const tokens = [];

        users.forEach(u => {
            if (u.deviceToken) {
                tokens.push(u.deviceToken);
            }
        });
        return tokens;
    }
}

