import { Observable } from 'rxjs/Observable';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alarm, Mission, MissionResponse } from '../models/models';
import { ToastService, ModalService, ModalComponent } from '../blocks/blocks';
import { SARService } from '../services/sar.service';


/**
 * Component for handling a single mission
 *
 */
@Component({
    moduleId: module.id,
    selector: 'alarm',
    templateUrl: 'alarm.component.html'
})
export class AlarmComponent implements OnInit {

    @Input() alarm: Alarm = <Alarm>{};
    @Input() mission: Mission;

    visible = false;

    private sub: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private toastService: ToastService,
        private SARService: SARService,
    ) { }



    ngOnInit() {
        this.alarm = this._createEmptyAlarm();
    }

    private _createEmptyAlarm() {
        //       let alarms = [];
        const alarm = new Alarm(
            null, // id
            new Date(), // date
            '', // message
            this.mission // mission

        );
        return alarm;
    }


    cancel() {
        this.visible = false;
    }


    /* Save this alarm */
    save() {
        this.SARService.addAlarm(this.mission, this.alarm)
            .subscribe(
            (res) => { console.log(res); },
            (err) => { console.log(err); },
            () => {
                this.visible = false;
                this.ngOnInit();
            }
            );
    }
}
