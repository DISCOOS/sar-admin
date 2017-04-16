import { Component, ViewChild } from '@angular/core';
import { ToastComponent, ToastService } from './blocks/blocks';
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  providers: [ToastService]
  
})
export class AppComponent  { 
	showMenu : boolean;

	constructor(private toastService : ToastService)
	{}

	/**
	Toggle mobile menu
	**/
	toggleMenu() {
		this.showMenu = !this.showMenu;
	}

}
