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
        headers.append('Authorization', 'key=' + CONFIG.firebase.API_KEY);
        headers.append('Content-Type', 'application/json');
        options.headers = headers;
    }
    /**
     * 
     * @param isEmergency : If this is true, everyone will receive push notification
     */
    sendPushNotifications(sendToAll: boolean, missionId: number, title: string, message: string) {

        const options = new RequestOptions();
        this._configureOptions(options);

        /* Firebase has to topics users can subscribe to. Everyone subscribes to emergency topic,
        so send to that if emergency. If not send only to available.
        */
        const topic = sendToAll ? '/topics/emergency' : '/topics/available';
        // const topic = '/topics/emergency';
        const body = {
            "notification": {
                "title": title,
                "text": message
            },
            'data': {
                'missionId': missionId
            },
            'to': topic
        };

        console.log(body)
        this.spinnerService.show();
        return this.http
            .post(CONFIG.firebase.URL, body, options)
            .map(res => res.json().data)
            .catch(this.exceptionService.catchBadPushResponse)
            .finally(() => this.spinnerService.hide());
    }

}

