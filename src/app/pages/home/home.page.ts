import { AuthService } from './../../services/auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit, OnDestroy {

  // Authentication
  private authListenerSubs: Subscription;
  isAuthenticated = false;

  // icons 
  iconFolder = "../assets/imgs/home/";
  icons = {
    categorie: "",
    prix: "",
    co2: "",
    lieu: "",
    qrCode: "",
    communaute: "",
  };

  constructor(
    private authService: AuthService,
    public toastController: ToastController,
    public alertController: AlertController,
    private router: Router) {}

  ngOnInit() {

    // Vérifier si connecté
    this.isAuthenticated = this.authService.getIsAuth();
    this.loadIcons();

    // Ajouter un listener sur le statut de l'authentification
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
        this.loadIcons();
      });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  checkAuth() {
    if (!this.isAuthenticated) {
      this.offlineUser();
    } else {
      this.router.navigate(['/tabs/form-options-co2'])
    }
  }

  loadIcons() {
    if (this.isAuthenticated) {
      // Remplacer les icones si connecté
      this.icons.categorie = this.iconFolder + "dossier_2.png";
      this.icons.prix = this.iconFolder + "prix_2.png";
      this.icons.co2 = this.iconFolder + "pas_2.png";
      this.icons.lieu = this.iconFolder + "localisation_2.png";
      this.icons.qrCode = this.iconFolder + "qr_code_2.png";
      this.icons.communaute = this.iconFolder + "communaute_2.png";
    } else {
      // Remplacer les icones si connecté
      this.icons.categorie = this.iconFolder + "dossier.png";
      this.icons.prix = this.iconFolder + "prix.png";
      this.icons.co2 = this.iconFolder + "pas.png";
      this.icons.lieu = this.iconFolder + "localisation.png";
      this.icons.qrCode = this.iconFolder + "qr_code.png";
      this.icons.communaute = this.iconFolder + "communaute.png";
    }
  }

  async offlineUser() {
    const toast = await this.toastController.create({
      message: 'Vous n \'êtes pas connecté',
      duration: 2000
    });
    toast.present();
  }
}