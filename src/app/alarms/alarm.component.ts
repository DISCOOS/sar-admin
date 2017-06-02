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
    @Input() alarms : Alarm[];
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
        this.SARService.addAlarm(this.mission, this.alarm, null)
            .subscribe(
            (res) => { this.alarms.push(this.alarm)},
            (err) => { this.toastService.activate(`Det skjedde en feil under opprettelse av varslingen. Den ble ikke sendt`, false, false); },
            () => {
                this.toastService.activate(`Alt OK! Sendte ut ny varsling`, true, true);
                this.visible = false;
                this.ngOnInit();
            }
            );
    }
}
