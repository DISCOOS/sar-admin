import { Component, ViewChild, OnInit } from '@angular/core';
import { ToastComponent, ToastService } from './blocks/blocks';
import { User } from './models/models';
import { UserService } from './services/user.service';
import {Subscription} from 'rxjs/Subscription';
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [ToastService]
  
})
export class AppComponent  { 
	// Only mobile nav
	showMobileMenu : boolean;
	
	// Toggles header after login
	showNav : boolean;

	constructor(
		private userService : UserService,
		private toastService : ToastService)
	{
	// Subscribes to Subject in UserService so we can update nav-view after login
	this.userService.isLoggedIn.subscribe((value) => {
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
