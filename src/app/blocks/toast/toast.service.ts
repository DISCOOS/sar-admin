import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs/Subject';

export interface ToastMessage {
  message: string;
  success: boolean;
  autoHide: boolean;
}

@Injectable()
export class ToastService {
  private toastSubject = new Subject<ToastMessage>();

  toastState = this.toastSubject.asObservable();

  constructor( @Optional() @SkipSelf() prior: ToastService) {
    if (prior) {
      console.log('toast service already exists');
      return prior;
    } else {
      console.log('created toast service');
    }
  }

  activate(message: string, success: boolean, autoHide: boolean) {
    this.toastSubject.next(<ToastMessage>{ message: message, success: success, autoHide: autoHide });
  }
}
