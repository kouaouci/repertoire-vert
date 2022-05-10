import { Component, NgZone, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { Subscription } from 'rxjs';
import { Notification } from 'src/app/shared/notification.model';
import { ToastController } from '@ionic/angular';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notifications: Notification[] = [];
  notificationSub: Subscription;

  constructor(
    private notificationService: NotificationService,
    public toastController: ToastController) { }
    
  ngOnInit() {
    // Get notifications
    this.notifications = this.notificationService.getNotifications();
    

    // Subscribe to cart updates
    this.notificationSub = this.notificationService.getNotificationsUpdateListener()
    .subscribe(notifications => {
      this.notifications = notifications;
    });
  }

  ionViewWillLeave() {
    // Update notifications
    this.notificationService.updateNotifications();
  }

  doRefresh(event) {
    // Refresh notifications
    this.notifications = this.notificationService.getNotifications();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  acceptReservation() {
    this.toastController.create({
      header: 'John!',
      message: 'a accepté votre demande de réservation!',
      position: 'top',
      cssClass: 'toast-custom-class',
      duration: 4000,
      buttons: [
        {
          side: 'end',
          icon: 'person',
          handler: () => {
            console.log('');
          }
        }, {
          side: 'end',
          role: 'cancel',
          handler: () => {
            console.log('');
          }
        }
      ]
    }).then((toast) => {
      toast.present();
    });
  }  

  denyReservation() {
    this.toastController.create({
      header: 'John!',
      message: 'a refusé votre demande de réservation!',
      position: 'top',
      cssClass: 'toast-custom-class',
      duration: 4000,
      buttons: [
        {
          side: 'end',
          icon: 'person',
          handler: () => {
            console.log('');
          }
        }, {
          side: 'end',
          role: 'cancel',
          handler: () => {
            console.log('');
          }
        }
      ]
    }).then((toast) => {
      toast.present();
    });
  } 
  
  friendRequest() {
    this.toastController.create({
      header: 'John!',
      message: 'a accepté votre demande d\'amis!',
      position: 'top',
      cssClass: 'toast-custom-class',
      duration: 4000,
      buttons: [
        {
          side: 'end',
          icon: 'person',
          handler: () => {
            console.log('');
          }
        }, {
          side: 'end',
          role: 'cancel',
          handler: () => {
            console.log('');
          }
        }
      ]
    }).then((toast) => {
      toast.present();
    });
  }
  
}
