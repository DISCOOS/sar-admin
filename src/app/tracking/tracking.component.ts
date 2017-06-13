import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import { MapService } from '../services/map.service';
import { MissionResponse } from '../models/models';

declare var google: any;
declare var RichMarker: any;

var marker: any;
marker = false;

@Component({
    moduleId: module.id,
    selector: 'tracking',
    templateUrl: 'tracking.component.html'
})

export class TrackingComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() missionResponses: any;

    markers = [];
    map: any;

    constructor(
        private mapService: MapService
    ) { }

    ngOnInit() {

        let mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 11,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(60.3927016, 5.321656, 17), // Bergen

            // styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
        };

        // Get the HTML DOM element that will contain map
        let mapElement = document.getElementById('trackingmap');

        // Create the Google Map using our element and options defined above
        this.map = new google.maps.Map(mapElement, mapOptions);

        if (this.missionResponses) {
            this.pushMarkers();
        }

    } // onInit()

    ngOnChanges() {
        console.log("--tracking onchanges triggered----")
        if (this.missionResponses) {
            this.pushMarkers();
        }
    }

    ngAfterViewInit() {
    }

    /**
     * Iterates each missionresponse for tracking data
     */
    pushMarkers() {
        this.missionResponses.forEach(mr => {
            if (mr.response && mr.tracking) {
                let date = new Date(mr.tracking.date);
                let marker = new RichMarker({
                    map: this.map,
                    shadow: 'none',
                    position: new google.maps.LatLng(mr.tracking.geopoint.lat, mr.tracking.geopoint.lng),
                    content: '<div><div class="label_content">' + mr.saruser.name + '<span class="small">' + date.toLocaleString("en-GB") + '</small>' // the data title you want to display
                    + '</div></div>'
                });
                this.markers.push(marker);
            }
        })
    }
}


