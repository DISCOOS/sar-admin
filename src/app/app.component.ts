import { Component, ViewChild, OnInit } from '@angular/core';
import { ToastComponent, ToastService } from './blocks/blocks';
import { User } from './models/user';
import { UserService } from './services/user.service';
import {Subscription} from 'rxjs/Subscription';
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [ToastService]
  
})
export class AppComponent implements OnInit  { 
	showMobileMenu : boolean;
	showNav : boolean;
	subscription: Subscription;

	constructor(
		private userService : UserService,
		private toastService : ToastService)
	{

	this.userService.isLoggedIn.subscribe((value) => {
           console.log("Show nav? " + value); 
           this.showNav = value;
         });
		
	}

	ngOnInit() {

	}

	/**
	Toggle mobile menu
	**/
	toggleMobileMenu() {
		this.showMobileMenu = !this.showMobileMenu;
	}

	


}
