import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';
import { Subscription } from 'rxjs/Subscription';


const KEY_ESC = 27;

@Component({
	moduleId: module.id,
	selector: 'modal',
	templateUrl: 'modal.component.html',
	styleUrls: ['modal.component.css']
})
export class ModalComponent implements OnInit {
	title: string;
	message: string;
	okText: string;
	cancelText: string;
	negativeOnClick: (e: any) => void;
	positiveOnClick: (e: any) => void;

	private defaults = {
		title: 'Confirmation',
		message: 'Do you want to cancel your changes?',
		cancelText: 'Avbryt',
		okText: 'OK'
	};
	private modalElement: any;
	private cancelButton: any;
	private okButton: any;

	constructor(modalService: ModalService) {

		console.log('Constructing modal');

		modalService.activate = this.activate.bind(this);
	}

	activate(title = this.defaults.title, message = this.defaults.message) {
		this.title = title;
		this.message = message;
		this.okText = this.defaults.okText;
		this.cancelText = this.defaults.cancelText;

		const promise = new Promise<boolean>((resolve, reject) => {
			this.negativeOnClick = (e: any) => resolve(false);
			this.positiveOnClick = (e: any) => resolve(true);
			this.show();
		});

		return promise;
	}

	ngOnInit() {
		this.modalElement = document.getElementById('confirmationModal');
		this.cancelButton = document.getElementById('cancelButton');
		this.okButton = document.getElementById('okButton');
	}

	private show() {
		document.onkeyup = null;

		if (!this.modalElement || !this.cancelButton || !this.okButton) {
			return;
		}
		this.modalElement.style.display = 'block';
		this.modalElement.style.opacity = 0;
		this.modalElement.style.zIndex = 9999;

		this.cancelButton.onclick = ((e: any) => {
			e.preventDefault();
			if (!this.negativeOnClick(e)) {
				this.hideDialog();
			}
		});

		this.okButton.onclick = ((e: any) => {
			e.preventDefault();
			if (!this.positiveOnClick(e)) {
				this.hideDialog();
			}
		});

		this.modalElement.onclick = () => {
			this.hideDialog();
			return this.negativeOnClick(null);
		};

		document.onkeyup = (e: any) => {
			if (e.which === KEY_ESC) {
				this.hideDialog();
				return this.negativeOnClick(null);
			}
		};

		this.modalElement.style.opacity = 1;
	}

	private hideDialog() {
		document.onkeyup = null;
		this.modalElement.style.opacity = 0;
		window.setTimeout(() => {
			this.modalElement.style.zIndex = 0;
			this.modalElement.style.display = 'none';
		}, 200);
	}
}
