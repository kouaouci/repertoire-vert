import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  // Translations
  translations;

  constructor(
    public alertController: AlertController,
    private translate: TranslateService) {
      // Get translations
      this.translate.getTranslation('fr').subscribe(res => {
        this.translations = res;
      });

      // Get translation change event
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.translations = event.translations;
      });
    }

  async presentAlert(header: string, message: string) {

    // Message d'erreur
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.translations.messages[header],
      message: this.translations.messages[message],
      buttons: ['Ok']
    });
    await alert.present();
  }

  async presentAlertConfirm(header: string, message: string, action: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: this.translations.messages[header],
      message: this.translations.messages[message],
      buttons: [
        {
          text: this.translations.cancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {}
        }, {
          text: this.translations.yes,
          handler: action
        }
      ]
    });
    await alert.present();
  }
}
