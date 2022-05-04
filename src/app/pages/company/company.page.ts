import { Component, OnInit } from '@angular/core';
import { IonTabs, ToastController } from '@ionic/angular';
import { AnimationBuilder, IonLabel } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera/';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyPageForm } from './company.page.form';
import { Router } from '@angular/router';
import { faDiagramSuccessor } from '@fortawesome/free-solid-svg-icons';
import { start } from 'repl';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
})
export class CompanyPage implements OnInit {

  companyForm: FormGroup;
  check:boolean
  picture: string;
  date: Date;
  customAlertOptions: any;
  constructor(
    private toastController: ToastController,
    private fb: FormBuilder,
    private router:Router,
    ) {}

  async takePicture() {
    console.log("coucou")
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl 
    });

    this.picture = image.dataUrl;
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

 public async submitForm(){
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

    if(this.companyForm.valid){
      const toast = await this.toastController.create({
        message:"Votre compte à été crée avec succès",
        duration: 3500,
        color: "gaea-green-deep",
        position:'bottom',
        animated: true,
      })
      toast.present();
      this.companyForm.reset();
      // this.router.navigate(['login']);
    }

    // if(this.companyForm.invalid){
    //   const toast = await this.toastController.create({
    //     message:"Une erreur c'est produite veuillez réessayer",
    //     duration: 3500,
    //     color: "danger",
    //     position:'bottom',
    //     animated: true,
    //   })
    //   toast.present();
    // }
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


