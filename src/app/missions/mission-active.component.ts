import { Observable } from 'rxjs/Observable';
import { Component, Input, OnInit, OnDestroy, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mission, MissionResponse, Alarm, Expence } from '../models/models';
import { ToastService, ModalService, ModalComponent } from '../blocks/blocks';
import { SARService } from '../services/sar.service';
import { PeopleListComponent } from '../people/people-list.component';
import { MapComponent } from '../map/map.component';
import { AlarmComponent } from '../alarms/alarm.component';
import { MapService } from '../services/map.service';
import { TrackingComponent } from '../tracking/tracking.component'

/**
 * Component for handling a single mission
 *
 */
@Component({
    moduleId: module.id,
    selector: 'mission-active',
    templateUrl: 'mission-active.component.html'
})
export class MissionActiveComponent implements OnInit, OnDestroy {

    //@Input() mission: Mission;
    @ViewChild(PeopleListComponent) peopleList: PeopleListComponent;
    @ViewChild(MapComponent) mapPicker: MapComponent;

    @ViewChild(AlarmComponent) alarm: AlarmComponent;


    @Input() mission: Mission = <Mission>{};

    missionResponses: MissionResponse[];
    alarms: Alarm[];
    expenses: Expence[];
    private id: any;
    private sub: any;
    private timersub: any;
    private timer;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private toastService: ToastService,
        private SARService: SARService,
        private zone: NgZone,
        private modalService: ModalService,
        private mapService: MapService
    ) { }



    ngOnInit() {
        // Recreate component 
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];

            this.timer = Observable.timer(2000, 1000 * 10);

            this.getMission();
        });

    }


    ngOnDestroy() {
        // Unsubscribe from timer
        if (this.timersub) {
            this.timersub.unsubscribe();
        }
    }

    getMission() {

        this.SARService.getMission(this.id)
            .subscribe((mission) => {
                this.mission = mission;
                this.alarms = mission.alarms;
            },
            (err) => console.log("error getting mission"),
            () => {
                // Ok, got mission: Find missionresponses if mission is active
                if (this.mission.isActive) {
                    this.getMissionResponses()
                    this.timersub = this.timer.subscribe(() => this.getMissionResponses());
                    // Mission is inactive; get expenses
                } else {
                    this.getExpenses();
                    console.log(this.expenses)
                }
            });
    }

    getMissionResponses() {

        console.log("getmissionresponses")
        this.SARService.getMissionResponses(this.mission.id)
            .subscribe(mr => {
                this.zone.run(() => {
                    this.missionResponses = mr;
                    console.log(this.missionResponses)
                })
            })
    }

    getExpenses() {
        this.SARService.getMissionExpences(this.mission)
            .subscribe(
            (expenses) => {
                this.expenses = expenses;
            },
            (err) => { console.log('Failed getting expenses for mission' + err); },
            () => { console.log('Ok,Got expenses'); console.log(this.expenses); });
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
        let msg = `Er du sikker på at vil slette denne aksjonen? All info tilhørende denne aksjonen vil bli SLETTET. Denne handlingen kan ikke reverseres`;
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

    toggleAlarm() {
        this.alarm.visible = this.alarm.visible ? false : true;
    }

}