import { LieuxDrivingTrafficPage } from './../lieux-driving-traffic/lieux-driving-traffic.page';
import { LieuxCyclingPage } from "./../lieux-cycling/lieux-cycling.page";
import { LieuxWalkingPage } from "./../lieux-walking/lieux-walking.page";
import { LieuxDrivingPage } from "./../lieux-driving/lieux-driving.page";
import { SuperTabsConfig } from "@ionic-super-tabs/core";
import { Component, ViewChild, ElementRef } from "@angular/core";
import * as L from "leaflet";
import { HttpClient } from "@angular/common/http";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { AlertController, IonSlides, Platform } from "@ionic/angular";
import { Storage, IonicStorageModule } from "@ionic/storage";
@Component({
  selector: "app-lieux",
  templateUrl: "./lieux.page.html",
  styleUrls: ["./lieux.page.scss"],
})
export class LieuxPage {
  LieuxWalkingPage = LieuxWalkingPage;
  lieuxDrivingPage = LieuxDrivingPage;
  LieuxCyclingPage = LieuxCyclingPage;
  LieuxTrafficPage= LieuxDrivingTrafficPage;
  opts = {
    icon: false,
    label: true,
    toolbarPos: "top",
    scrollable: true,
  };

  config: SuperTabsConfig = {
    debug: true,
    allowElementScroll: false,
  };

  tabs: any[] = [];
  selectedTab = 0;
  categories: any;
  ok : boolean = true;
  ok1: string = "HomePage";
  user_did_tutorial:any
  constructor(public alertController: AlertController) { 
      this.user_did_tutorial=localStorage.getItem('user_did_tutorial');
	

}
  async LieuxTips() {
    const alert = await this.alertController.create({
      cssClass: 'alertButton',
      header: 'Le module Lieux',
      message: 'Le module Lieux vous permet de chercher une entreprise verte ou un produit vert par lieux, cherchez et sélectionnez l entreprise ou le produit désiré(e) et vous allez avoir une navigation real time avec la trajectoire de votre position au point d arrivé',
    
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
