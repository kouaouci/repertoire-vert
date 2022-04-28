import { Component, NgZone, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { Subscription } from 'rxjs';
import { Notification } from 'src/app/shared/notification.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notifications: Notification[] = [];
  notificationSub: Subscription;

  constructor(
    private notificationService: NotificationService) { }

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
}
