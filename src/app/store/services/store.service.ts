import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private changeCart = new Subject<boolean>();
  changeCart$ = this.changeCart.asObservable();

  constructor() { }

  updateCart(): void {
    this.changeCart.next(true);
  }

}
