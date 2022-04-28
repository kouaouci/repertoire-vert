import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Notification } from 'src/app/shared/notification.model';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss']
})
export class NotificationCardComponent implements OnInit, OnChanges {

  @Input() notification: Notification;

  url: string;
  message: string;
  icon: string;

  constructor() { }

  ngOnInit() {
    // Get link, message and icon of notification
    this.getInfo();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['notification'].currentValue) {
      if (this.notification) {
        //console.log(this.notification);
      }
    }
  }

  getInfo() {
    switch(this.notification.subject) { 
      case 'covoiturage invitation': { 
         this.url = '/tabs/covoiturage-details/' + this.notification.entityId;
         this.message = 'carpoolInvite';
         this.icon = 'car-outline';
         break; 
      } 
      case 'friendship accepted': { 
        this.url = '/tabs/covoiturage-details/' + this.notification.entityId;
        this.message = 'friendRequestAccepted';
        this.icon = 'person-add-outline';
         break; 
      } 
      default: { 
        this.url = '/tabs/covoiturage-details/' + this.notification.entityId;
        this.message = 'carpoolInvite';
        this.icon = 'person-add-outline';
         break; 
      } 
   } 
  }
}
