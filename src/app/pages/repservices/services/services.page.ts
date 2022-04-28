import { ServiceDetailPage } from './../service-detail/service-detail.page';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RepVertApiService } from 'src/app/services/rep-vert-api/RepVertApiService';
import { IonicSelectableComponent } from 'ionic-selectable';
@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
 services:any;
 filterTerm: string; 
 filterTermm:string;
 options = {
  centeredSlides: true,
  slidesPerView: 1,
  spaceBetween: -60,
  direction: 'vertical',
};

categories = {
  slidesPerView: 2.5,
};
category;
id;
cats:any;
item;
catCHoice;
role:any;
base_url = "https://www.repertoirevert.org/rest/offerByCategory/";
    constructor(private repVertAPI:RepVertApiService,private http:HttpClient,public alertController: AlertController,
      public toastController: ToastController,private auth: AuthService,public modalController: ModalController) { }
  
    ngOnInit() {

 
    }
  
    ionViewDidEnter(){
this.role=localStorage.getItem('role')
      this.populatesServices()
      this.populateCats()
    }
  populatesServices(){
    this.repVertAPI.getServicesOffersFromCompanies().subscribe(data =>{  
      this.services =data;
      console.log('Services from companies: ',this.services);
  
     
     // this.idparticipant=  localStorage.getItem('idparticipant');
    });
    
  }
  /*
  //Future use for search pro by cat
  searchByCat() {
    let url = this.base_url+ this.category;
    this.http.get(url).subscribe((data: any) => {
      console.log(data);
      this.posts = data;
    });
  }
  */
  searchByCat() {
    let url = this.base_url+ this.category;
    this.http.get(url).subscribe((data: any) => {
      console.log(data);
      this.services = data;
    });
  }
  populateCats(){
    this.repVertAPI.getServicesCats().subscribe(data =>{  
      this.cats =data;
      console.log('cats: ',this.cats);
  
     
     // this.idparticipant=  localStorage.getItem('idparticipant');
    }); 
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: ServiceDetailPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
  }
  portChange(i, event: {
    component: IonicSelectableComponent,
    value: any
    }) {
    console.log('currency code:', i + " - " + event.value);
    }
  }
  