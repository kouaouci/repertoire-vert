import { RepVertApiService } from 'src/app/services/rep-vert-api/RepVertApiService';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.page.html',
  styleUrls: ['./add-service.page.scss'],
})
export class AddServicePage implements OnInit {
  catchoice
  ServiceForm:FormGroup;
cats:any;
services:any;
    constructor(private repVertAPI:RepVertApiService, private zone: NgZone, private route:ActivatedRoute, public fb: FormBuilder,
      public toastController:ToastController, public auth:AuthService, private router:Router) {
      this.ServiceForm = this.fb.group({
        type:[null,Validators.required],
        description:[null,Validators.required],
        field:[null,Validators.required],
     
  
      });
     }
  
    ngOnInit() {
   
    }
    ionViewDidEnter(){
      this.populateCats()
     
    
    }
    populatesServices(){
      this.repVertAPI.getServicesOffersFromCompanies().subscribe(data =>{  
        this.services =data;
        console.log('Services from companies: ',this.services);
    
       
       // this.idparticipant=  localStorage.getItem('idparticipant');
      });
      
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
    if (!this.ServiceForm.valid) {
      return false;
    } else {
      this.repVertAPI.addServiceByCompany(this.ServiceForm.value,this.catchoice)
        .subscribe((res) => {
          this.zone.run(() => {
            this.presentToast();
        
            this.populatesServices()
            this.router.navigateByUrl('/services')
            //this.getDiscussion();
           // this.getRecipientMessages()
            console.log(res)
            this.ServiceForm.reset();
          })
        });
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Service Ajouté avec succé',
      duration: 2000
    });
    toast.present();
  }
  

  }
  