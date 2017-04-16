import { Component, ViewChild } from '@angular/core';
import { ToastComponent, ToastService } from './blocks/blocks';
import { User } from './models/user';
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [ToastService]
  
})
export class AppComponent  { 
	showMenu : boolean;
	currentUser : User;

	constructor(private toastService : ToastService)
	{
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
		console.log(this.currentUser)
	}

	/**
	Toggle mobile menu
	**/
	toggleMenu() {
		this.showMenu = !this.showMenu;
	}

}
