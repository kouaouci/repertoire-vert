import { Component, OnInit } from '@angular/core';
import { IonTabs, ToastController } from '@ionic/angular';
import { AnimationBuilder, IonLabel } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera/';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyPageForm } from './company.page.form';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file/file.service';
import { type } from 'os';
import { stringify } from 'querystring';

@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
})
export class CompanyPage implements OnInit {
  modes = ['date'];
  selectedMode = 'date';
  
  companyForm: FormGroup;
  co2Selected: any;
  qrcodeSelected: any;
  picture: any;
  date: Date;
  customAlertOptions: any;
  
  
  constructor(
    private toastController: ToastController,
    private fb: FormBuilder,
    private router:Router,
    private fileService: FileService,
  ) {defineCustomElements(window);}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl 
    });
    this.picture = image.dataUrl;
  }

  public uploadFile(type: string, file: File){
    this.fileService.uploadImage(type,file)
  }

  async deletePicture() {
    this.picture = undefined
  }

  async showOfflineMessage() {
    const toast = await this.toastController.create({
      message: 'Vous n\'êtes pas connecté(e)',
      duration: 5000
    });
    toast.present();
  }

  ngOnInit() {
    this.companyForm = new CompanyPageForm(this.fb).createCompanyForm();
  }

  async submitForm(){
    const formData = new FormData();
    formData.append('gaeaUserId',this.companyForm.value.gaeaUserId);
    formData.append('username',this.companyForm.value.username);
    formData.append('password',this.companyForm.value.password);
    formData.append('passwordConfirm',this.companyForm.value.passwordConfirm);
    formData.append('email',this.companyForm.value.email);
    formData.append('emailConfirm',this.companyForm.value.emailConfirm);
    formData.append('name',this.companyForm.value.name);
    formData.append('socialreason',this.companyForm.value.socialreason);
    formData.append('street',this.companyForm.value.street);
    formData.append('postcode',this.companyForm.value.postcode);
    formData.append('region',this.companyForm.value.region);
    formData.append('city',this.companyForm.value.city);
    formData.append('phone',this.companyForm.value.phone);
    formData.append('urlwebsite',this.companyForm.value.urlwebsite);
    formData.append('urlfacebook',this.companyForm.value.urlfacebook);
    formData.append('urllinkedin',this.companyForm.value.urllinkedin);
    formData.append('urltwitter',this.companyForm.value.urltwitter);
    formData.append('startingdate',this.companyForm.value.startingdate);
    formData.append('certification',this.companyForm.value.certification);
    formData.append('influencezone',this.companyForm.value.influencezone);
    formData.append('wantevaluation',this.companyForm.value.wantevaluation);
    formData.append('description',this.companyForm.value.description);
    formData.append('vision',this.companyForm.value.vision);
    formData.append('country', this.companyForm.value.country);
    formData.append('categories', this.companyForm.value.categories);
    console.log(this.companyForm.value)   
  }
    /*this.companyService.post(formData).subcribe({
      next: () =>{
          const toast = await this.toastController.create({
          message: 'Votre compte à été crée avec succès',
          duration: 3500
      }),
      error: (error) =>{
          const toast = await this.toastController.create({
          message: 'Une erreur est survenue veuillez réessayer',
          duration: 3500
      });
      this.router.navigate(['/login']);
   
    });
    toast.present();
    })
    */
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


