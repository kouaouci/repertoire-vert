import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from 'src/app/shared/notification.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  REP_VERT_API = environment.url + 'api/';

  private notifications: Notification[] = [];
  private notificationsUpdated = new Subject<Notification[]>();

  constructor(
    private http: HttpClient,
    private alertService: AlertService) { }


  initializeNotifications(): void {
    let userId = localStorage.getItem('repVertId');

    // Reset notifications and notify subscribers
    this.notifications = [];
    this.notificationsUpdated.next([...this.notifications]);

    this.http.get<{ code: number, message: string, notifications: Notification[] }>
      (this.REP_VERT_API + 'users/' + userId + '/notifications').subscribe(
        response => {
          if (response.code === 200) {
            this.notifications = response.notifications;
            this.notificationsUpdated.next([...this.notifications]);
            /*response.notifications.forEach(n => {              
              this.notifications.push(n);
              this.notificationsUpdated.next([...this.notifications]);
            });*/
          } else {
            this.alertService.presentAlert("error", "errorOccurred");
          }
        },
        error => {
          console.log(error);
          this.alertService.presentAlert("error", "errorOccurred");
        }
      );
  }

  getNotifications(): Notification[] {
    // Return cart of user
    return [...this.notifications];
  }


  getNewNotifications(): number {
    return this.notifications.filter( n => {
      return !n.opened;
    }).length;
  }


  getNotificationsUpdateListener() {
    // Return observable for components interested in cart changes
    return this.notificationsUpdated.asObservable();
  }


  updateNotifications() {
    let userId = localStorage.getItem('repVertId');

    this.http.put<{code: number, message: string}>
    (this.REP_VERT_API + 'users/' + userId + '/notifications', {})
    .subscribe(
      response => {
        if (response.code === 200) {
          this.notifications.forEach(n => {
            n.opened = true;
          });
          this.notificationsUpdated.next([...this.notifications]);
        }
      },
      error => {
        console.log(error);
      }
    )
  }
}
