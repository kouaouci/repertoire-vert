import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.page.html',
  styleUrls: ['./identification.page.scss'],
})
export class IdentificationPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  gotoLoginPage(): void {
    this.navCtrl.navigateForward('inscription');
  }
  gotoCompanyPage() {
    this.navCtrl.navigateForward('company');
  }

  ngOnInit() {
  }

}
