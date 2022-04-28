import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RepVertApiService } from 'src/app/services/rep-vert-api/RepVertApiService';

@Component({
  selector: 'app-company-services',
  templateUrl: './company-services.page.html',
  styleUrls: ['./company-services.page.scss'],
})
export class CompanyServicesPage implements OnInit {
  userInformations:any = []; 
  companyId:any;
  services:any;
  slideOptions = {
    direction: 'vertical',
  };
  constructor(public auth:AuthService,private repVertAPI:RepVertApiService,public toastController: ToastController) { }

  ngOnInit() {
    this.loadUser()
  }
  loadUser()
  {
    this.auth.profile().subscribe(data =>{
      // console.log('detalles: ',result);
      this.userInformations =  data;
      console.log("loaded")
      console.log( this.userInformations)
      console.log( this.userInformations);
      console.log( this.userInformations.id);
      this.companyId=this.userInformations.id
      this.populatesServices()
    
    });
    
 
  }
  populatesServices(){
    this.repVertAPI.getOfferedServicesByCompany(this.companyId).subscribe(data =>{  
      this.services =data;
      console.log('Services from this company: ',this.services);
  
     
     // this.idparticipant=  localStorage.getItem('idparticipant');
    });
    
  }
  deleteService(id) {
    this.repVertAPI.deleteServicebyComp(id).subscribe(data=>{
      this.presentToast()
      console.log(data)
    })
    this.populatesServices()
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Catégorie supprimée.',
      duration: 2000
    });
    toast.present();
  }
}
