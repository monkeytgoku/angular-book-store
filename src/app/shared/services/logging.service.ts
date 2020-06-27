import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  constructor() { }

  logToConsole(msg) {
    console.log(msg);
  }
}
