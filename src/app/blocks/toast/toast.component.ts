import { Component, OnInit } from '@angular/core';
import { ToastService } from './toast.service';



@Component({
  selector: 'toast',
  templateUrl: 'app/blocks/toast/toast.component.html'
})
export class ToastComponent implements OnInit {
	message: string;
	success : boolean;
	private _toastElement: any;

	constructor(toastService: ToastService) {
		toastService.activate = this.activate.bind(this);
		this.success = true;
	}


	/**
	@param success : Use true for successmessage and false for error message
	**/
	 activate(message: string, success : boolean, autoHide ?: boolean) {
	    this.message = message;
	    this.success = success; 
	    this._show(autoHide);
  	}


	ngOnInit() {
		this._toastElement = document.getElementById('toast');
	}

	private _show(autoHide ?: boolean) {
		this._toastElement.style.display = 'block'
		this._toastElement.style.opacity = 1;
		if(autoHide)
			window.setTimeout(() => this._hide(), 2500);
	}


	private _hide() {
		this._toastElement.style.opacity = 0;
		window.setTimeout(() => this._toastElement.style.zIndex = 0, 400)
		this.delay(400).then(() => this._toastElement.style.display = 'none');
		 
	}

	private delay(ms){
    var ctr, rej, p = new Promise(function (resolve, reject) {
        ctr = setTimeout(resolve, ms);
        rej = reject;
    });
    return p; 
}

}