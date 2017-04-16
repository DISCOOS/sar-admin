import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//import { AlertService, AuthenticationService } from '../_services/index';
import { SARService } from '../services/sar.service';
import { ToastService } from '../blocks/blocks';

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
        private SARService: SARService,
        private toastService: ToastService) { }

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
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                  
                  this.toastService.activate("Innlogging mislyktes", false);
                  this.loading = false;
                });
    }
}
