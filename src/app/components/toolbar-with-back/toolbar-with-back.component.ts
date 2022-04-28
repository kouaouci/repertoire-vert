import { Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-toolbar-with-back',
  templateUrl: './toolbar-with-back.component.html',
  styleUrls: ['./toolbar-with-back.component.scss']
})
export class ToolbarWithBackComponent implements OnInit, OnDestroy {

  // Authentication
  private authListenerSubs: Subscription;
  isAuthenticated = false;

  @Input() title: string;
  @Input() backUrl: string;

  notifications: number = 0;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router,
    private _location: Location) { }

  ngOnInit() {

    // Vérifier si connecté
    this.isAuthenticated = this.authService.getIsAuth();
    
    // Ajouter un listener sur le statut de l'authentification
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      });
    
    // Récuprer les notificaions
    this.notifications = this.notificationService.getNewNotifications();

    // Ajouter un listener sur les notifications
    this.notificationService.getNotificationsUpdateListener().subscribe(
      notifications => {
        this.notifications = 0;
        notifications.forEach(n => {
          if (!n.opened) {
            this.notifications += 1;
          }
        })
      }
    )
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  goBack() {
    if (this.backUrl) {
      this.router.navigate([this.backUrl]);
    } else {
      this._location.back();
    }
  }
}
