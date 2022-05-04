import { MapPricingPage } from './../map-pricing/map-pricing.page';
import { MapInfoPage } from './../map-info/map-info.page';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SuperTabs } from '@ionic-super-tabs/angular';
import { SuperTabChangeEventDetail,SuperTabsConfig } from '@ionic-super-tabs/core';

import * as L from 'leaflet';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.page.html',
  styleUrls: ['./pricing.page.scss'],
})
export class PricingPage implements OnInit {


  @ViewChild(SuperTabs) superTabs: SuperTabs;
  user_did_tutorial:any
  PricingPage = MapPricingPage;
  mapInfo=MapInfoPage
  opts = {
    icon: false,
    label: true,
    toolbarPos: 'top',
    scrollable: true,
  };

  config: SuperTabsConfig = {
    debug: true,
    allowElementScroll: false,
  };

  tabs: any[] = [];

    map: any;
    selectedTab = 0;

    constructor(
      public alertController: AlertController) { 
        this.user_did_tutorial=localStorage.getItem('user_did_tutorial');
    
  
  }

  ngOnInit() {
  }
  ionViewDidEnter() { 
    
    //Loading the map

  }





onTabSelect(ev: any) {

}
async PricingTips() {
  const alert = await this.alertController.create({
    cssClass: 'alertButton',
    header: 'Le module Pricing',
    message: 'Le module Pricing vous permet de chercher un produit selon son prix et d avoir la trajectoire vers ce produit la'
    +'Saisissez votre produit désiré dans la barre de recherche'
    +'<ion-img src="../../../assets/tutoriel/pricingsearch.PNG"></ion-img>'
    +'et sélectionner le produit desiré'+'<br>'
    +'<ion-img src="../../../assets/tutoriel/pricingsearchresult.PNG"></ion-img>' ,
  
    buttons: ['OK']
  });
  await alert.present();

  const { role } = await alert.onDidDismiss();
  console.log('onDidDismiss resolved with role', role);
}
}
