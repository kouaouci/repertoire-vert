import { RepVertApiService } from 'src/app/services/rep-vert-api/RepVertApiService';
import { Component, NgZone, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  activitiesDisplay: any;
  userInformations: any = [];
  display: any;
  tutoriel;
  toggle: any = true;
  toggleText: any;
  user_did_tutorial: any
  status = false;

  show_tutorial = true;
  show_activities = false;
  show_status = false;

  private currentTokenSubject = new BehaviorSubject<string>(null);

  constructor(
    private authProvider: AuthService, 
    public toastController: ToastController) { }

  ngOnInit() {
  }

  switchTutorial($event) {
    this.show_tutorial = !this.show_tutorial;
  }

  switchActivites($event) {
    this.show_activities = !this.show_activities;
  }

  switchStatus($event) {
    this.status = !this.status;
  }

  loadUser() {
    this.authProvider.profile().subscribe(data => {
      // console.log('detalles: ',result);
      this.userInformations = data;
      console.log("loaded")
      console.log(this.userInformations)
      console.log(this.userInformations);
      console.log(this.userInformations.id);
      localStorage.setItem('userid', this.userInformations.id);
    });
  }

  async ActivatedToast() {
    const toast = await this.toastController.create({
      message: 'Guide assisté activé',
      duration: 2000
    });
    toast.present();
  }

  async DesctivatedToast() {
    const toast = await this.toastController.create({
      message: 'Guide assisté déactivé',
      duration: 2000
    });
    toast.present();
  }

  activateToolTips(event) {

    if (this.tutoriel = localStorage.getItem('user_did_tutorial') == 'true') {
      localStorage.setItem('user_did_tutorial', 'false');
      this.toggle = false
      this.toggleText = "Assistance guidé desactivé"
      this.currentTokenSubject.next(this.toggle);
      this.DesctivatedToast()

    } else {
      localStorage.setItem('user_did_tutorial', 'true');
      this.toggle = true
      this.toggleText = "Assistance guidé activé"
      this.currentTokenSubject.next(this.toggle);
      this.ActivatedToast()
    }
  }
}
