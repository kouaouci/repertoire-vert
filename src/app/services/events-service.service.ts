import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsServiceService {
  private dataObserved = new BehaviorSubject<any>('');
  currentEvent = this.dataObserved.asObservable();
  constructo(){}
  
  publish(param):void {
    this.dataObserved.next(param);
  }
}