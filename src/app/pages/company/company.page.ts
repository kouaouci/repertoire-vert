import { Component, OnInit } from '@angular/core';
import { IonTabs, ToastController } from '@ionic/angular';
import { AnimationBuilder, IonLabel } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera/';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyPageForm } from './company.page.form';
import { Router } from '@angular/router';
import { faDiagramSuccessor } from '@fortawesome/free-solid-svg-icons';
import { start } from 'repl';
import { throwError } from 'rxjs';
import { Category } from 'src/app/shared/category.model';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { FileService } from 'src/app/services/file/file.service';
@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
})
export class CompanyPage implements OnInit {

  companyForm: FormGroup;
  check:boolean
  picture: any;
  date: Date;
  customAlertOptions: any;
  categories:Category[] = [];
  constructor(
    private categoriesService: CategoriesService,
    private toastController: ToastController,
    private fb: FormBuilder,
    private router:Router,
    private fileService: FileService
    ) {
      defineCustomElements(window);
    }

    ngOnInit() {
      this.categoriesService.getCategories().subscribe({
        next: (categories: Category[]) => {
          this.categories = categories;
        },
        error: async (_error) =>{
          const toast = await this.toastController.create({
            message:"Un problème est survenue lors de la connexion au serveur veuillez réesayer",
            duration: 3500,
            position: "bottom",
            animated: true,
            color:"danger"
          })
          toast.present();
        }
      })
      this.companyForm = new CompanyPageForm(this.fb).createCompanyForm();
      this.picture = undefined;
    }
  
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl 
    });

    this.picture = image.dataUrl;
    console.log(this.picture)
    
  }
  deleteFile(){
    this.picture= undefined;
  }
  
  
  async showOfflineMessage() {
    const toast = await this.toastController.create({
      message: " Vous n'êtes pas connecté(e)",
      duration: 5000
    });
    toast.present();
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
    formData.append('image',this.picture);
    if(this.picture != undefined){
      this.fileService.uploadImage('image', this.picture);
    };

    if(this.companyForm.valid){
      const toast = await this.toastController.create({
        message:"Votre compte à été crée avec succès",
        duration: 3500,
        color: "gaea-green-deep",
        position:'bottom',
        animated: true,
      })
      toast.present();
      console.log(this.companyForm.value)
      this.companyForm.reset();
      this.deleteFile();
      
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

  //   uploadImage() {
  //   // Get image file
  //   let imageFile: File = this.productForm.get('image').value;

  //   // Check if file size is larger than 2MB
  //   if (imageFile.size > 2000000) {
  //     this.alertService.presentAlert('error', 'fileTooBig')
  //     this.loading = false;
  //   } else {

  //     this.fileService.uploadImage('products', imageFile).then(result => {
  //       // Once image uploaded, save product info to DB
  //       this.saveProductToDB(result);
  //     }, error => {
  //       this.loading = false;
  //     });
  //   }
  // }




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


