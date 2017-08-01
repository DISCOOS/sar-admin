import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastService } from '../blocks/blocks';

@Injectable()
export class ExceptionService {
    constructor(
        private toastService: ToastService,
        private router: Router
    ) { }

    catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
        console.log(errorResponse);
        // tslint:disable-next-line:triple-equals
        if (errorResponse.status == '401' || errorResponse.statusCode == '401') {
            this.toastService.activate('Sesjonen er utløpt. Logg inn på nytt', false, true);
            const route = ['/login'];
            this.router.navigate(route);
        }
        const res = <Response>errorResponse;
        const err = res.json();

        console.log(err)
        let emsg = err ?
            (err.error ? err.error.message : JSON.stringify(err)) :
            (res.statusText || 'Ukjent feil');
        let statusCode;
        if (err && err.status) {
            statusCode = err.status;
        } else {
            statusCode = err ?
                (err.error ? err.error.statusCode : '') : '';
        }


        if (statusCode === '401') {
            emsg = 'Ingen tilgang. Forsøk å logge inn på nytt';
        } else if (statusCode === '404') {
            emsg = 'Denne ressursen finnes ikke';
        } else if (statusCode === '500') {
            emsg = 'Intern serverfeil i SAR Status API';
        } else {
            emsg = '';
        }

        this.toastService.activate(`Error ${statusCode} : ${emsg}`, false, true);
        return Observable.of(false);
    }


    catchBadResponseFromLogin: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
        if (errorResponse.status === '401') {
            this.toastService.activate('Brukernavn og / eller passord er feil', false, true);
        } else {
            this.toastService.activate(`Det oppstod en feil under innloggingen`, false, false);
        }
        return Observable.throw(errorResponse);
    }

    /**
     * Catches errors from sending pushnotifications
     */
    catchBadPushResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
        if (errorResponse.meta.status > 400) {
            this.toastService.activate('Det oppstod en feil under utsendingsending av pushvarslinger til de som har app.', false, true);
        }
        return Observable.of(false);
    }
}
