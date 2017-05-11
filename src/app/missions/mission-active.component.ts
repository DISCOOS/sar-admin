
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mission } from '../models/models';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ToastComponent, ToastService } from '../blocks/blocks';
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
export class MissionActiveComponent implements OnInit {

    //@Input() mission: Mission;
    @ViewChild(PeopleListComponent) peopleList: PeopleListComponent;
    @ViewChild(MapComponent) mapPicker: MapComponent;

    @Input() mission: Mission = <Mission>{};

    private id: any;
    private sub: any;



    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private toastService: ToastService,
        private SARService: SARService
    ) { }





    ngOnInit() {
        // Recreate component if we're allready in contact-single
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            
            
            this.getMission();
        });

    }

    getMission() {

     this.SARService.getMission(this.id)
        .subscribe(mission => this.mission = mission);
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
     * TODO: Event-bind from DOM-button
     * Deletes an mission.
     */
    delete() {
        
        //this.modal.close();
        this.SARService.deleteMissionById(this.mission)
          .subscribe(() => {
            this.gotoMissions();
          });
    
        this.gotoMissions();
    }

}