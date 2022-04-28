import { AlertController, ModalController, NavController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-allow-modal',
  templateUrl: './allow-modal.page.html',
  styleUrls: ['./allow-modal.page.scss'],
})
export class AllowModalPage implements OnInit {

  constructor( private route:ActivatedRoute, 
   
    private router: Router,
    public modalController: ModalController,
    public alertController: AlertController,
    public navParams:NavParams,
    private activeRouter: ActivatedRoute) { }

  ngOnInit() {
  }

  reload() {
   window.location.reload()
  }
}
