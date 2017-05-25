import { Component, ViewChild, OnInit } from '@angular/core';
import { ToastComponent, ToastService } from './blocks/blocks';
import { User } from './models/models';
import { SARService } from './services/sar.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	providers: [ToastService]

})
export class AppComponent {
	// Only mobile nav
	showMobileMenu: boolean;

	// Toggles header after login
	showNav: boolean;

	constructor(
		private SARService: SARService,
		private toastService: ToastService) {
		// Subscribes to Subject in UserService so we can update nav-view after login
		this.SARService.isLoggedIn.subscribe((value) => {
			//console.log("Show nav " + value); 
			this.showNav = value;
		});

	}

	/**
	Toggle mobile menu
	**/
	toggleMobileMenu() {
		this.showMobileMenu = !this.showMobileMenu;
	}




}
