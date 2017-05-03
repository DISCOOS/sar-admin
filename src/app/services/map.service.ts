import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

declare var google: any;

@Injectable()
export class MapService {

    constructor() {
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
}