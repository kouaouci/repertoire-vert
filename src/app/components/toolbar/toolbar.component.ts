import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  // Subscribers
  private authListenerSubs: Subscription;

  // Routes avec background transluscent
  routes = [
    '/'
  ]

  // User or company
  isCompany: boolean = false;
  companyId: number;

  // Variables pour le style du toolbar
  @Input() title: string;
  isAuthenticated = false;
  burger = 'dark';
  background = 'white';
  showBorder: boolean;

  // Nombre de notifications
  notifications: number = 0;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router) {
    router.events.subscribe(val => {
      this.initToolbar();
    })
  }

  ngOnInit() {

    // Vérifier si connecté
    this.isAuthenticated = this.authService.getIsAuth();

    // Ajouter un listener sur le statut de l'authentification
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        this.initToolbar();
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

    this.initToolbar();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  initToolbar() {

    // Check if user or company
    if (this.isAuthenticated) {
      let user = this.authService.getAuthenticatedUser();
      if (user.role === 'ROLE_COMPANY') {
        this.isCompany = true;
        this.companyId = user.id;
      }
    }

    // Background transluscent ou non
    if (this.routes.includes(this.router.url)) {
      this.showBorder = false;
      this.background = 'transluscent';

      if (!this.isAuthenticated) {
        this.burger = 'white';
      }
    } else {
      this.showBorder = true;
    }
  }
}
