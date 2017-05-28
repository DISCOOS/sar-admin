import { Component, ViewChild, OnInit } from '@angular/core';
import { ToastComponent, ToastService } from './blocks/blocks';
import { SARUser } from './models/models';
import { SARService } from './services/sar.service';
import { UserService } from './services/user.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
	moduleId: module.id,
	selector: 'app',
	templateUrl: 'app.component.html',
	providers: [ToastService]

})
export class AppComponent {
	// Only mobile nav
	showMobileMenu: boolean;


	constructor(
		private SARService: SARService,
		private toastService: ToastService,
		private userService: UserService
	) {
	}

	get user() {
		return this.userService.user;
	}

	/**
	Toggle mobile menu
	**/
	toggleMobileMenu() {
		this.showMobileMenu = !this.showMobileMenu;
	}
}
