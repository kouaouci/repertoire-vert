import { CompanyProfilePageComponent } from './../company-profile/company-profile.page';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { RepVertApiService } from 'src/app/services/rep-vert-api/RepVertApiService';

@Component({
  selector: 'app-map-info',
  templateUrl: './map-info.page.html',
  styleUrls: ['./map-info.page.scss'],
})
export class MapInfoPage implements OnInit {
entreprises;
filterTerm: string;
id;
level: number;
column: string = 'name';
typedWord:any;
text:string="";
public userCard: boolean = false;
public status: boolean = true;
  constructor(private repVertAPI: RepVertApiService,public modalController: ModalController, public alertController:AlertController) {
    this.status = true;
    this.text="Afficher la barre de recherche";
this.typedWord=localStorage.getItem('typedWord')
   }
 
  ngOnInit() {
    this.getOrderByUser()
  }
  getOrderByUser(){
    this.repVertAPI.fetchallCompaniesProducts().subscribe(data =>{
      this.entreprises =  data;
      console.log("orders"+ this.entreprises)
     
     
    });
  }
  driverStatusChange(event, val) {


    if (this.status) {
    
      console.log('true')
      setTimeout(() => {
        this.presentAlertConfirm();
      }, 2000)
  
    } else {
      this.userCard = false;
      this.text="Afficher la barre de recherche"
    }
  
  }
  
async presentAlertConfirm() {
  const alert = await this.alertController.create({
    header: 'Confirm Request!',
    message: 'You have a new Pickup request',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: 'Okay',
        handler: () => {
          this.userCard = true;
        }
      }
    ]
  });

  await alert.present();
}

}
