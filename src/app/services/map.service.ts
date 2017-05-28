import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CONFIG } from '../shared/config';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
declare var google: any;
let API_KEY = CONFIG.google.API_KEY;

@Injectable()
export class MapService {

    constructor(
        private http: Http
    ) {
        //this.geocoder = new google.maps.Geocoder();
    }



    coordsToAddress(geopoint: any) {

        if (!geopoint || !geopoint.lat || !geopoint.lng) return;

        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(geopoint.lat, geopoint.lng);

        return Observable.create(observer => {
            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK && results[4]) {
                    observer.next(results[4].formatted_address);
                    observer.complete();

                } else {
                    console.log('Error - ', results, ' & Status - ', status);
                    observer.next("");
                    observer.complete();
                }
            });
        })
    }

    distanceBetweenTwoPoints(a: any, b: any) {
        let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + a.lat + ',' + a.lng + '&destinations=' + b.lat + ',' + b.lng + '&key=' + API_KEY;
        console.log("URL: " + url)
        return this.http.get(url)
            .map((response: Response) => {
                //console.log(<SARUser[]>response.json().persons)
                //console.log(response.json())
                return response.json()
            })
       // .do(res => console.log("Google sier : " + res.json().rows.elements.duration.text))
        //.catch(this.exceptionService.catchBadResponse)
        //.finally(() => this.spinnerService.hide());

    }
}