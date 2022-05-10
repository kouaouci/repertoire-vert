import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-information-form',
  templateUrl: './information-form.component.html',
  styleUrls: ['./information-form.component.scss'],
})
export class InformationFormComponent implements OnInit {


  user: any/*{user: User, reviews: {average: string, total: number}}*/ ;
  id : any /*: number*/
  userUpdateForm: FormGroup

   constructor(
    private userService:UsersService,
    private toastController: ToastController,
    private router: Router,
    private fb:FormBuilder
  ){
    this.userUpdateForm = this.fb.group({
      firstname: ["", [Validators.required, Validators.minLength(3),Validators.maxLength(50)]],
      lastname: ["", [Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
      dateBirth: [""],
      streetnumber: ["", [Validators.pattern('/^[0-9]\\d*$/')]],
      street: ["", [Validators.minLength(8), Validators.maxLength(254)]],
      postcode:["", [Validators.maxLength(10)]],
      city: ["", [Validators.minLength(3),Validators.maxLength(254)]],
      country: ["", [Validators.minLength(3), Validators.maxLength(150)]],
      url: ["", [Validators.maxLength(254), Validators.minLength(10)]],
    })
  }

   ngOnInit() {
    if(localStorage.getItem('repVertId') != undefined){
      this.id = parseInt(localStorage.getItem('repVertId'));
      this.userService.getUser(this.id).subscribe({
        next:
        async (response) => {
          this.user = response.user;
          this.userUpdateForm = this.fb.group({
            firstname: [this.user.firstname, [Validators.required, Validators.minLength(3),Validators.maxLength(50)]],
            lastname: [this.user.lastname, [Validators.required,Validators.minLength(3),Validators.maxLength(50)]],
            dateBirth: [this.user.dateBirth],
            streetnumber: [this.user.streetnumber],
            street: [this.user.street, [Validators.minLength(8), Validators.maxLength(254)]],
            postcode:[this.user.postcode, [Validators.maxLength(10)]],
            city: [this.user.city, [Validators.minLength(3),Validators.maxLength(254)]],
            country: [this.user.country, [Validators.minLength(3), Validators.maxLength(150)]],
            url: [this.user.url, [Validators.maxLength(254), Validators.minLength(10)]],
          });
        },
        error: 
         async () => {
          const toast = await this.toastController.create({
            message:"Une erreur avec le serveur est survenue. Veuillez réessayer",
            duration: 3500,
            color: "danger",
            position:'bottom',
            animated: true,
          })
          toast.present();
        }
      })
    } else {
     async () => {
      console.log('erreur ID not found')
        const toast = await this.toastController.create({
          message: "Vous devez être connecté pour acceder à cette partie de l'application",
          animated: true,
          position:'bottom',
          color:'danger',
          duration: 3500,
        })
        toast.present();
        this.router.navigate(['login']);
     }
    }
  }


  submitForm(){
    const formData: FormData = new FormData();
    formData.append('firstname', this.userUpdateForm.value.firstname);
    formData.append('',this.userUpdateForm.value.lastname);
    formData.append('',this.userUpdateForm.value.dateBirth);
    formData.append('',this.userUpdateForm.value.streetnumber);
    formData.append('',this.userUpdateForm.value.street);
    formData.append('',this.userUpdateForm.value.postcode);
    formData.append('',this.userUpdateForm.value.city);
    formData.append('',this.userUpdateForm.value.country);
    formData.append('',this.userUpdateForm.value.url);
    
    console.log(this.userUpdateForm.value);
  }

}
