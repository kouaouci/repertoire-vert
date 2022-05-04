import { Component, OnInit } from '@angular/core';
import { IonTabs, ToastController } from '@ionic/angular';
import { AnimationBuilder, IonLabel } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
})
export class CompanyPage implements OnInit {

  picture: string;
  date: Date;
  customAlertOptions: any;
  constructor(
    private toastController: ToastController) {}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl 
    });

    this.picture = image.dataUrl;
  }
  
  btnClicked() {
    alert("Votre compte entreprise vient d'être crée")
  }

  async showOfflineMessage() {
    const toast = await this.toastController.create({
      message: 'Vous n\'êtes pas connecté(e)',
      duration: 5000
    });
    toast.present();
  }

  ngOnInit() {
  }
}



interface InputChangeEventDetail {
  value: string | undefined | null;
}

interface ModalCustomEvent extends CustomEvent {
  target: HTMLIonModalElement;
}

interface ModalOptions {
  component: any;
  componentProps?: { [key: string]: any };
  presentingElement?: HTMLElement;
  showBackdrop?: boolean;
  backdropDismiss?: boolean;
  cssClass?: string | string[];
  animated?: boolean;
  swipeToClose?: boolean;

  mode?: 'ios' | 'md';
  keyboardClose?: boolean;
  id?: string;

  enterAnimation?: AnimationBuilder;
  leaveAnimation?: AnimationBuilder;
}


