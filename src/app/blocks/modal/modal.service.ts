import { Injectable } from '@angular/core';

@Injectable()
export class ModalService {
  activate: (title?: string, message?: string) => Promise<boolean>;
}

