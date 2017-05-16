import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ToastService } from '../blocks/blocks';

@Injectable()
export class ExceptionService {
    constructor(private toastService: ToastService) { }

    catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {
        console.log(errorResponse)
        let res = <Response>errorResponse;

        let err = res.json();

        console.log(err)
        let emsg = err ?
            (err.error ? err.error.message : JSON.stringify(err)) :
            (res.statusText || 'Ukjent feil');

        let statusCode = err ?
            (err.error ? err.error.statusCode : '') : '';

        if(statusCode == '401') { 
            emsg = 'Ingen tilgang. Forsøk å logge inn på nytt'
        } 
        else if(statusCode == '500') {
            emsg = 'Det har oppstått en ubehandlet feil i SAR-API. '
        }
        
        this.toastService.activate(`Error ${statusCode} : ${emsg}`, false, false);
        return Observable.of(false);
    }


}
