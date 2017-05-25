import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService } from './toast.service';
import { Subscription } from 'rxjs/Subscription'



@Component({
	selector: 'toast',
	templateUrl: 'app/blocks/toast/toast.component.html'
})
export class ToastComponent implements OnInit, OnDestroy {
	private defaults = {
		title: '',
		message: ''
	};

	message: string;
	success: boolean;
	private _toastElement: any;
	private _toastSubscription: Subscription;

	constructor(private toastService: ToastService) {
		console.log("constructing toast")
		this._toastSubscription = this.toastService.toastState.subscribe((toastMessage) => {
			//			console.log(`activiting toast: ${toastMessage.message}`)
			this.activate(toastMessage.message, toastMessage.success, toastMessage.autoHide);
		});
	}


	/**
	@param success : Use true for successmessage and false for error message
	**/
	activate(message: string, success = true, autoHide = false) {
		this.message = message;
		this.success = success;
		this._show(autoHide);
	}


	ngOnInit() {
		this._toastElement = document.getElementById('toast');
	}

	ngOnDestroy() {
		this._toastSubscription.unsubscribe();
	}

	private _show(autoHide?: boolean) {
		this._toastElement.style.display = 'block'
		this._toastElement.style.opacity = 1;
		this._toastElement.style.zIndex = 9000;
		if (autoHide)
			window.setTimeout(() => this._hide(), 2500);
	}


	private _hide() {
		this._toastElement.style.opacity = 0;
		window.setTimeout(() => this._toastElement.style.zIndex = 0, 400)
		this.delay(400).then(() => this._toastElement.style.display = 'none');

	}

	private delay(ms) {
		var ctr, rej, p = new Promise(function (resolve, reject) {
			ctr = setTimeout(resolve, ms);
			rej = reject;
		});
		return p;
	}

}