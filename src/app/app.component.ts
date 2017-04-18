import { Component, ViewChild } from '@angular/core';
import { ToastComponent, ToastService } from './blocks/blocks';
import { User } from './models/user';
import { UserService } from './services/user.service';
import {Subscription} from 'rxjs/Subscription';
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [ToastService]
  
})
export class AppComponent  { 
	showMenu : boolean;
	currentUser : User;
	subscription: Subscription;

	constructor(
		private userService : UserService,
		private toastService : ToastService)
	{
		this.subscription = this.userService.userItem$.subscribe(
      	currentUser => this.currentUser = currentUser);
	}

	/**
	Toggle mobile menu
	**/
	toggleMenu() {
		this.showMenu = !this.showMenu;
	}

}
