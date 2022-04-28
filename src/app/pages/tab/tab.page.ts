import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit, OnDestroy {

  // Subscribers
  private authListenerSubs: Subscription;

  isAuthenticated = false;
  co2Selected = false;
  qrcodeSelected = false;
  menuSelected = false;

  // Homepage
  isHomepage = false;

  // User role
  isCompany: boolean;
  companyId: number;

  // Cart
  cartSub: Subscription;
  nbProducts = 0;

  @ViewChild('tabs', { static: false }) tabs: IonTabs;

  constructor(
    private toastController: ToastController,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router) { }

  ngOnInit() {

    // Verify if homepage
    if (this.router.url === '/') {
      this.isHomepage = true;
    } else {
      this.isHomepage = false;
    }

    // Verify if user is authenticated
    this.isAuthenticated = this.authService.getIsAuth();


    if (this.isAuthenticated) {
      // Verify if company or user connected
      this.checkIfCompany();

      // Get cart products
      this.getCartNbProducts();
    }

    // Ajouter un listener sur le statut de l'authentification
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        if (this.isAuthenticated) {
          this.checkIfCompany();
        }
      });
    
    // Subscribe to cart updates
    this.cartSub = this.cartService.getCartUpdateListener().subscribe(cart => {
      this.getCartNbProducts();
    });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  checkIfCompany() {
    let user = this.authService.getAuthenticatedUser();

    if (user.role === 'ROLE_COMPANY') {
      this.isCompany = true;
      this.companyId = user.id;
    } else {
      this.isCompany = false;
    }
  }

  getCartNbProducts() {
    let cart = this.cartService.getCart();
    this.nbProducts = cart.reduce((a, b) => {
      return a + b['quantity'];
    }, 0);
  }

  setCurrentTab() {
    // Pour changer la couleur de l'icone active
    const selected = this.tabs.getSelected();
    if (selected === 'form-options-co2') {
      this.co2Selected = true;
      this.qrcodeSelected = false;
      this.menuSelected = false;
    } else if (selected === 'qrcode') {
      this.qrcodeSelected = true;
      this.co2Selected = false;
      this.menuSelected = false;
    } else if (selected === 'menu') {
      this.qrcodeSelected = false;
      this.co2Selected = false;
      this.menuSelected = true;
    } else {
      this.qrcodeSelected = false;
      this.co2Selected = false;
      this.menuSelected = false;
    }
  }

  async showOfflineMessage() {
    const toast = await this.toastController.create({
      message: 'Vous n \'êtes pas connecté',
      duration: 2000
    });
    toast.present();
  }
} 
