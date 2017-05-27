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
        console.log(errorResponse)
        if (errorResponse.status == '401' || errorResponse.statusCode == '401') {
            this.toastService.activate('Sesjonen er utløpt. Logg inn på nytt', false, true);
            let route = ['/login'];
            this.router.navigate(route);
        }
        let res = <Response>errorResponse;
        let err = res.json();

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


        if (statusCode == '401') {
            emsg = 'Ingen tilgang. Forsøk å logge inn på nytt'
        }
        else if (statusCode == '404') {
            emsg = 'Denne ressursen finnes ikke'
        }
        else if (statusCode == '500') {
            emsg = 'Intern serverfeil i SAR-API '
        } else {
            emsg = ""
        }

        this.toastService.activate(`Error ${statusCode} : ${emsg}`, false, true);
        return Observable.of(false);
    }


}
