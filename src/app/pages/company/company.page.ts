import { Component, OnInit } from '@angular/core';
import {  ToastController } from '@ionic/angular';
import { AnimationBuilder } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera/';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Category } from 'src/app/shared/category.model';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { FileService } from 'src/app/services/file/file.service';
@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss'],
})
export class CompanyPage implements OnInit {


  companyForm: FormGroup;
  picture: any;
  date: Date;
  customAlertOptions: any;
  categories:Category[] = [];
  loading: boolean
  formBuilder: any;

  constructor(
    private categoriesService: CategoriesService,
    private toastController: ToastController,
    private fb: FormBuilder,
    private router:Router,
    private fileService: FileService
    ) {
    this.companyForm= this.fb.group(
        {
          username: [
            "",
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(50),
            ],
          ],
          password: [
            "",
            [
              Validators.required,
              Validators.minLength(8),
              Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})"),
            ],
          ],
          passwordConfirm: [
            "",
            [
              Validators.required,
              Validators.minLength(8),
              Validators.pattern("((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})"),
            ],
          ],
          email: [
            "",
            [
              Validators.required,
              Validators.email,
              Validators.pattern("[A-Za-z0-9.%-]+@[A-Za-z0-9.%-]+.[a-z]{2,3}"),
            ],
          ],
          emailConfirm: [
            "",
            [
              Validators.required,
              Validators.email,
              Validators.pattern("[A-Za-z0-9.%-]+@[A-Za-z0-9.%-]+.[a-z]{2,3}"),
            ],
          ],
          name: [
            "",
            [
              Validators.required,
              Validators.minLength(3),
              Validators.maxLength(100),
            ],
          ],
          socialreason: [
            "",
            [
              Validators.required,
              Validators.minLength(2),
              Validators.maxLength(50),
            ],
          ],
          street: ["", [Validators.minLength(8), Validators.maxLength(254)]],
          postcode: ["", [Validators.minLength(3), Validators.maxLength(15)]],
          region: ["", [Validators.minLength(3), Validators.maxLength(254)]],
          city: ["", [Validators.minLength(3), Validators.maxLength(254)]],
          country: ["", [Validators.minLength(3), Validators.maxLength(254)]],
          phone: ["", [Validators.minLength(10), Validators.maxLength(20)]],
          urlwebsite: ["", [Validators.minLength(3), Validators.maxLength(254)]],
          urlfacebook: ["", [Validators.minLength(3), Validators.maxLength(254)]],
          urllinkedin: ["", [Validators.minLength(3), Validators.maxLength(254)]],
          urltwitter: ["", [Validators.minLength(3), Validators.maxLength(254)]],
          startingdate: ["", [Validators.required]],
          certification: ["", [Validators.required]],
          influencezone: ["", [Validators.required]],
          categories: ["", [Validators.required]],
          wantevaluation: ["", [Validators.required]],
          description: ["", [Validators.minLength(3), Validators.maxLength(508)]],
          vision: ["", [Validators.minLength(3), Validators.maxLength(508)]],
          image: [""],
        },
        {validators: [this.checkPassword, this.checkEmail],}
      );
    
      defineCustomElements(window);
    }
    checkPassword: ValidatorFn = (
      group: AbstractControl
    ): ValidationErrors | null => {
      const password = group.get("password")!.value;
      const passwordConfirm = group.get("passwordConfirm")!.value;
      return password === passwordConfirm ? null : { passwordsNotEquals: true };
    };
    checkEmail: ValidatorFn = (
      group: AbstractControl
    ): ValidationErrors | null => {
      const email = group.get("email")!.value;
      const emailConfirm = group.get("emailConfirm")!.value;
      return email === emailConfirm ? null : { emailsNotEquals: true };
    };
   
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
      this.picture = undefined;
    }
  
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl 
    });
    this.picture = image.dataUrl;
    this.companyForm.get('image').setValue(this.picture);    
  }
  deleteFile(){
    this.picture= undefined;
  }
  private async uploadImage() {
    // Get image file
    let imageFile: File = this.companyForm.get('image').value;

    // Check if file size is larger than 2MB
    if (imageFile.size > 2000000) {
      const toast = await this.toastController.create({
        message: "the file is too big",
        duration: 3500,
        animated: true,
        color: "danger",
        position:'bottom'
      })
      toast.present()
      this.loading = false;
    } else {
      console.log(imageFile)
      this.fileService.uploadImage('companies', imageFile).then( () => {
        this.loading = true;
      }, () => {
        this.loading = false;
      });
    }
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
      this.uploadImage();
    };

    // a mettre dans le subscribe "next"
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
      // this.companyForm.reset();
      this.deleteFile();
      
      // this.router.navigate(['login']);
    }

    // error: () => {
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


