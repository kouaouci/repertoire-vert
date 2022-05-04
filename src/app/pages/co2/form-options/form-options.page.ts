import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TransportService } from 'src/app/services/transports/transport.service';
import { Transport } from 'src/app/shared/Transport.model';
import { Activity } from 'src/app/shared/activity.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivityService } from 'src/app/services/activities/activity.service';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-options',
  templateUrl: './form-options.page.html',
  styleUrls: ['./form-options.page.scss'],
})
export class FormOptionsPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides; 

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  transports: Transport[] = [];

  // Activity form
  selectedTransportId: number;
  selectedActivityId: number;
  selectedActivityName: string;

  // Activity subscription
  activitySub: Subscription;

  // Translations
  translations;

  constructor(
    private authService: AuthService,
    private activityService: ActivityService,
    private transportService: TransportService,
    private router: Router,
    private translate: TranslateService,
    public alertService: AlertService,
    public loadingController: LoadingController) { }

  ngOnInit() {
    // Get translations
    this.translate.getTranslation('fr').subscribe(res => {
      this.translations = res;
    });

    // Get translation change event
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translations = event.translations;
    });

    // Get transport types
    this.getTransports();

    // Subscribe to activities updates
    this.activitySub = this.activityService.getActivitiesUpdateListener()
    .subscribe(activities => {

      if (this.router.url === '/tabs/form-options-co2') {
        let index = activities.findIndex(a => {
          return a.status === 'Current';
        });
  
        if (index !== 1) {
          this.router.navigate(['/tabs/co2/home']);
        }
      }
    });
  }

  ionViewDidEnter() {
    if (this.slides) {
      // Go to first slide
      this.slides.slideTo(0);
    }
  }

  getTransports() {
    // Initialize transports list
    this.transports = [];

    // Fetch transports
    this.transportService.getTransports().then(result => {
      this.transports = result;
    });
  }

  handleTransport(id: number) {
    this.selectedTransportId = id;
  }

  handleActivity(activity: { id: number, name: string}) {
    this.selectedActivityId = activity.id;
    this.selectedActivityName = activity.name;
  }

  async handleSubmit() {

    if (this.selectedTransportId && this.selectedActivityId) {
      // Get connected user id
      let userId: number = this.authService.getAuthenticatedUser().id;

      // Create new activity
      let activity: Activity = {
        transport: this.selectedTransportId,
        user: userId,
        totalC02: 0,
        totalDistance: 0
      }

      if (this.selectedActivityId != -1) {
        // Add new activity with exisiting activity type
        activity.activityTypeId = this.selectedActivityId;
        this.addActivity(activity);
      } else {


        if (this.selectedActivityName === "") {
          this.alertService.presentAlert("error", "invalidActivity");
        } else{
          // Add new activity with new activity type
          activity.activityTypeName = this.selectedActivityName;
          this.addActivity(activity);
        }
      }
    } else {
      this.alertService.presentAlert("error", "verifyChoices");
    }
  }

  async addActivity(activity: Activity) {

    // Start loading spinner
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: this.translations.messages.pleaseWait
    });
    loading.present();

    this.activityService.addActivity(activity).then(result => {
      // Stop loading spinner
      loading.dismiss();

      // Set transport for activity
      result.transport = this.selectedTransportId;

      // Set empty array for activity transports
      result.activityTransports = [];

      // Set empty array for activity positions
      result.activityPositions = [];

      // Navigate to steps calculator
      this.router.navigate(['/tabs/co2/home'], {state: result});
    });
  }

  changeSlide() {
    this.slides.slideNext();
  }
}
