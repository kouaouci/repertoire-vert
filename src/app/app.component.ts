import { EventsServiceService } from './services/events-service.service';
import { AuthService } from './services/auth/auth.service';
import { TabPage } from './pages/tab/tab.page';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { MenuController, NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from './services/cart/cart.service';
import { OrdersService } from './services/orders/orders.service';
import { CategoriesService } from './services/categories/categories.service';
import { NotificationService } from './services/notifications/notification.service';
import { ActivityService } from './services/activities/activity.service';

/* Leaflet icons */
import { icon, Marker } from 'leaflet';
import { TranslateService } from '@ngx-translate/core';
import { FavoriteCompanyService } from './services/favorites/favoriteCompany.service';
const iconRetinaUrl = '../assets/icon/leaflet/marker-icon-2x.png';
const iconUrl = '../assets/icon/leaflet/marker-icon.png';
const shadowUrl = '../assets/icon/leaflet/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  // App language
  language: string = 'fr';
  translations;

  // Authentication
  private authStatusSub: Subscription;
  public isAuthenticated = false;

  // Logged out pages
  pagesLoggedOut = [
    { title: 'homepage', page: '/', icon: 'home' },
    { title: 'login', page: 'login', icon: 'lock-open' },
    //{ title: 'settings', page: 'tabs/settings', icon: 'settings' },
    //{ title: 'Communauté', page: 'category', icon: 'planet' },
  ];

  // Logged in pages
  pagesLoggedIn = [
    { title: 'homepage', page: '/', icon: 'home' },
    { title: 'notifications', page: 'tabs/notifications', icon: 'notifications' },
    { title: 'settings', page: 'tabs/settings', icon: 'settings' },
    { title: 'users', page: 'tabs/users', icon: 'people' },
    { title: 'requests', page: 'tabs/invitations', icon: 'person-add' },
    //{ title: 'chats', page: 'chats', icon: 'people-circle-outline' },
    { title: 'shop', page: 'tabs/home-shop', icon: 'storefront' },
    { title: 'myOrders', page: 'tabs/user-orders', icon: 'bag-check' },
    //  { title: 'Services', page: 'services', icon: 'file-tray-stacked' },
    // { title: 'Favoris', page: 'FavoritesPages', icon: 'star' },
  ];

  // Selected Menu item
  selecteMenu: any;

  // Number of notifications
  notifications: number = 0;

  constructor(
    private menu: MenuController,
    private nav: NavController,
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
    private ordersService: OrdersService,
    private activityService: ActivityService,
    private categoriesService: CategoriesService,
    private favoriteCompanyService: FavoriteCompanyService,
    private notificationService: NotificationService,
    public eventService: EventsServiceService,
    private _translate: TranslateService) {
      // this language will be used as a fallback when a translation isn't found in the current language
      _translate.setDefaultLang('fr');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      _translate.use('fr');
  }

  ngOnInit() {

    // Initialization
    this.initializeApp();

    // Show OnBoarding pages to first time users
    this.redirectFirstTimeUsers();

    // Initialize language
    //this._initTranslate('fr');

    // Listen to authentication changes
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;

        if (isAuthenticated) {
          this.initializeUser();
        }
      });

    // Verfiy authentication
    this.verifyAuth();
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

  initializeApp() {

    // Initialize categories
    this.categoriesService.initializeCategories();
  }

  changeLanguage(event) {
    this.language = event.target.value;
    this._translateLanguage();
  }

  getTranslations() {
    this._translate.get('sidebar').subscribe(res => {
      this.translations = res;
    });
  }

  _translateLanguage(): void {
    this._translate.use(this.language);
    this.getTranslations();
  }

  _initTranslate(language) {
    // Set the default language for translation strings, and the current language.
    this._translate.setDefaultLang('fr');
    if (language) {
      this.language = language;
    }
    else {
      // Set your language here
      this.language = 'fr';
    }
    this._translateLanguage();
  }

  verifyAuth() {
    const id = parseInt(localStorage.getItem('id'));
    const token = localStorage.getItem('token');

    if (id !== null && token !== null) {

      this.authService.verifyToken(id, token).subscribe(response => {

        if (response.code === 200) { // Token verified
          // Authenticate user
          this.loginUser();

        } else {
          this.authService.setAuth(false);
          this.isAuthenticated = false;
          this.logout();
        }
      },
        error => {
          this.authService.setAuth(false);
          this.isAuthenticated = false;
          this.logout();
        });
    }
  }

  loginUser() {
    const userId = parseInt(localStorage.getItem('id'));
    this.authService.getUser(userId).subscribe(response => {

      this.authService.authenticateUser(response);
      this.authService.setAuth(true);
      this.isAuthenticated = true;
    });
  }

  logout() {
    this.menu.close();
    this.nav.navigateRoot('/');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  redirectFirstTimeUsers() {
    if (!localStorage.getItem('welcome')) {
      localStorage.setItem('welcome', 'true');
      this.router.navigateByUrl('/welcome');
    }
  }

  initializeUser() {
    // Initialize notifications
    this.notificationService.initializeNotifications();
    this.notificationService.getNotificationsUpdateListener().subscribe(
      notifications => {
        this.notifications = 0;
        notifications.forEach(n => {
          if (!n.opened) {
            this.notifications += 1;
          }
        });
      }
    )

    // Initialize cart
    this.cartService.initializeCart();

    // Initialize orders
    this.ordersService.initializeOrders();

    // Initialize activities
    this.activityService.initializeActivities();

    // Initialize favorites
    this.favoriteCompanyService.initializeFavoriteCompanies();
  }

  openPage(p, index) {
    if (p.page) {
      if (index != 0) {
        this.selecteMenu = index;
        //this.b = 0;
      }
      this.nav.navigateRoot(p.page);
      this.menu.close();
    }
  }

  checkDarkTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    if (prefersDark.matches) {
      document.body.classList.toggle('dark');
    }
  }
}