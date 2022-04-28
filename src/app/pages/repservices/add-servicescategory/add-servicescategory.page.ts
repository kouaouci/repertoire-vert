import { RepVertApiService } from 'src/app/services/rep-vert-api/RepVertApiService';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-add-servicescategory',
  templateUrl: './add-servicescategory.page.html',
  styleUrls: ['./add-servicescategory.page.scss'],
})
export class AddServicescategoryPage implements OnInit {
  catchoice
  CategoryForm:FormGroup;
cats:any;
services:any;
    constructor(private repVertAPI:RepVertApiService, private zone: NgZone, private route:ActivatedRoute, public fb: FormBuilder,
      public toastController:ToastController, public auth:AuthService, private router:Router) {
      this.CategoryForm = this.fb.group({
        name:[null,Validators.required],
        description:[null,Validators.required],
        slug:[null,Validators.required],
        image:[null,Validators.required],
  
      });
     }
  
    ngOnInit() {
   
    }
    ionViewDidEnter(){
   
     
    
    }
 
    populateCats(){
      this.repVertAPI.getServicesCats().subscribe(data =>{  
        this.cats =data;
        console.log('cats: ',this.cats);
    
       
       // this.idparticipant=  localStorage.getItem('idparticipant');
      }); 
    }
 
    selecttransport($event) {
      this.catchoice=$event.target.value;
      console.log(this.catchoice) ;
   
  }
  onFormSubmit() {
    if (!this.CategoryForm.valid) {
      return false;
    } else {
      this.repVertAPI.addServiceCategory(this.CategoryForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            this.presentToast();
        
            this.populateCats()
            this.router.navigateByUrl('/services')
            console.log(res)
            this.CategoryForm.reset();
          })
        });
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Catégorie Ajouté avec succés',
      duration: 2000
    });
    toast.present();
  }
  

  }
  