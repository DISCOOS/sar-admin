
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/timer';
import { Observable } from 'rxjs/Observable';
import { Component, Input, OnInit, OnDestroy, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mission, MissionResponse } from '../models/models';
import { ToastService, ModalService, ModalComponent } from '../blocks/blocks';
import { SARService } from '../services/sar.service';
import { PeopleListComponent } from '../people/people-list.component';
import { MapComponent } from '../map/map.component';

/**
 * Component for handling a single mission
 *
 */
@Component({
    moduleId: module.id,
    selector: 'mission-single',
    templateUrl: 'mission-active.component.html'
})
export class MissionActiveComponent implements OnInit, OnDestroy {

    //@Input() mission: Mission;
    @ViewChild(PeopleListComponent) peopleList: PeopleListComponent;
    @ViewChild(MapComponent) mapPicker: MapComponent;

    @ViewChild(ModalComponent) modal: ModalComponent;

    @Input() mission: Mission = <Mission>{};

    //missionResponses: Observable<MissionResponse[]>;
    missionResponses: MissionResponse[];
    private id: any;
    private sub: any;
    private timersub: any;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private toastService: ToastService,
        private SARService: SARService,
        private zone: NgZone,
        private modalService: ModalService
    ) { }



    ngOnInit() {
        // Recreate component if we're allready in contact-single
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];


            this.getMission();
        });
        // Only listen for responses if mission is indeed active  

        let timer = Observable.timer(2000, 5000);
        setTimeout(() => {
            this.getMissionResponses()
            this.timersub = timer.subscribe(() => this.getMissionResponses())

        }, 2000);

    }


    ngOnDestroy() {
        // Unsubscribe from timer
        if (this.timersub)
            this.timersub.unsubscribe();
    }

    getMission() {

        this.SARService.getMission(this.id)
            .subscribe(mission => this.mission = mission);
    }

    getMissionResponses() {

        console.log("getmissionresponses")
        this.SARService.getMissionResponses(this.mission.id)
            .subscribe(mr => {
                this.zone.run(() => {
                    this.missionResponses = mr;
                })
            })

    }


    /**
     * Routes back to mission-list
     */
    private gotoMissions() {
        let route = ['/missions'];
        this.router.navigate(route);
    }



    /**
     * Event-bind from DOM-button
     * Cancels changes and sends back to mission-list
     */
    cancel() {

        this.toastService.activate('Ingen endringer ble lagret', false, true);
        this.gotoMissions();
    }


    /**
     * Event-bind from DOM-button
     * Save new or update exisiting mission
     */
    save() {

        let mission = this.mission

        this.SARService.updateMission(mission)
            .subscribe(() => {
                console.log("updated")
                // Route back to mission-list.
                this.gotoMissions();
            });


        this.gotoMissions();

    }

    /**
     * 
     * Deletes a mission.
     */

    delete() {
        let msg = `Er du sikker på at vil slette ${this.mission.title}? Denne handlingen kan ikke reverseres`;
        this.modalService.activate("Bekreft sletting", msg).then((responseOK) => {
            if (responseOK) {
                this.SARService.deleteMissionById(this.mission)
                    .subscribe(
                    () => { // Success path
                        this.toastService.activate(`Slettet ${this.mission.title}`, true, true);
                        this.gotoMissions();
                    },
                    (err) => console.log("Failed Delete"),
                    () => console.log('Delete OK')
                    );
            }
        });
    }

    // Ends mission. Put datestamp when ended, isActive: false
    endMission() {

        let msg = `Er du sikker på at vil avslutte ${this.mission.title}? Aksjoner kan ikke startes på nytt etter at de er avsluttet`;
        this.modalService.activate("Bekreft avslutting av aksjon", msg).then((responseOK) => {
            if (responseOK) {
                this.SARService.setMissionAsInactive(this.mission)
                    .subscribe(
                    () => { // Success path
                        this.toastService.activate("Aksjonen ble avsluttet", true, true)
                        this.gotoMissions();
                    },
                    (err) => console.log("Failed to set mission as inactive"),
                    () => console.log('Success: Mission set as inactive')
                    );
            }
        });

    }

}