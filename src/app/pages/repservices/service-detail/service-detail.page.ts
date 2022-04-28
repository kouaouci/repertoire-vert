import { RepVertApiService } from 'src/app/services/rep-vert-api/RepVertApiService';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.page.html',
  styleUrls: ['./service-detail.page.scss'],
})
export class ServiceDetailPage implements OnInit {
  service:any;
  comments:any;
  likes:any;
  CompanyId:any;
  DevisForm:FormGroup;
    constructor(private repVertAPI:RepVertApiService, private zone: NgZone, private route:ActivatedRoute, public fb: FormBuilder,
      public toastController:ToastController) {
      this.DevisForm = this.fb.group({
        devis:[null,Validators.required]
  
      });
     }
  
    ngOnInit() {
    
    }
    ionViewDidEnter(){
      this.getSingleService()

    }
  getSingleService(){
    let id = this.route.snapshot.paramMap.get('id');
    this.repVertAPI.getServicesOffersFromCompaniesDetail(id).subscribe(data =>{  
      this.service =data
      console.log('Single service: ',this.service)
      this.CompanyId=this.service[0].company.id
  
    })
 
  }
  onFormSubmit() {
    let id = this.route.snapshot.paramMap.get('id');
    if (!this.DevisForm.valid) {
      return false;
    } else {
      this.repVertAPI.getDevisCostfromCompany(id,this.CompanyId,this.DevisForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            this.presentToast()

            console.log(res)
            this.DevisForm.reset();
          })
        });
    }
  
  
  }


  
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Votre demande de devis a été envoyé à '+this.service[0].company.firstname+" "+this.service[0].company.lastname,
      duration: 2000
    });
    toast.present();
  }
  }
  