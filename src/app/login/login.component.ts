import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SARService } from '../services/sar.service';
import { ToastService, SpinnerService } from '../blocks/blocks';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private toastService: ToastService,
        private SARService: SARService,
        private spinnerService: SpinnerService
    ) { }

    ngOnInit() {
        // reset login status
        this.SARService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.SARService.login(this.model.username, this.model.password)
            .subscribe(
            data => {
                if (data && data.error) {
                    this.toastService.activate(`Du er ikke registert med admintilgang. Dette må settes opp i KOVA`, false, false);
                } else {
                    this.router.navigate([this.returnUrl]);
                    this.toastService.activate(`Velkommen!`, true, true);
                }
            },
            (error) => {
                this.loading = false;
            },
            () => {
                this.loading = false;
            });
    }
}
