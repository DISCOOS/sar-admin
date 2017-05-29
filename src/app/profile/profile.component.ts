import { Component, Input, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mission, Alarm } from '../models/models';
import { ToastComponent, ToastService } from '../blocks/blocks';
import { SARService } from '../services/sar.service';
import { SARUser } from '../models/models';


@Component({
    moduleId: module.id,
    selector: 'profile',
    templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {

    public user: SARUser;
    private id: any;
    private sub: any;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private toastService: ToastService,
        private SARService: SARService
    ) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];


            this.getUser();
        });
    }

    private getUser() {
        this.SARService.getSARUser(this.id).subscribe((user) => {
            this.user = user;
        },
            (err) => { this.toastService.activate("Fant ikke denne brukeren",false,false); },
            () => { console.log("OK") }
        )
    }


    /**
     * Routes back to mission-list
     */
    private gotoMissions() {
        let route = ['/missions'];
        this.router.navigate(route);
    }

}