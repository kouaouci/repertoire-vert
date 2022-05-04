import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { MenuController, IonSlides } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-co2-tutorial',
  templateUrl: './co2-tutorial.page.html',
  styleUrls: ['./co2-tutorial.page.scss'],
})
export class Co2TutorialPage {
  showSkip = true;

  slideOpts = {
    effect: 'flip',
  };
  @ViewChild('slides') slides: IonSlides;

  constructor(
    public menu: MenuController,
    public router: Router,
    public storage: Storage
  ) {}
  sliderChanges(event) { }
  startApp() {
    this.router
      .navigateByUrl('/co2/home', { replaceUrl: true })
      .then(() => localStorage.setItem('ion_did_tutorial', "true"));
  }

  onSlideChangeStart(event) {
    event.target.isEnd().then(isEnd => {
      this.showSkip = !isEnd;
    });
  }

  ionViewWillEnter() {
    localStorage.getItem('ion_did_tutorial');

    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }
}
