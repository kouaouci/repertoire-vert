import { AlertController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { CovoiturageService } from 'src/app/services/covoiturage/covoiturage.service';
import { Covoiturage } from 'src/app/shared/Communauty.model';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alerts/alert.service';
@Component({
  selector: 'app-communaute-find-result',
  templateUrl: './communaute-find-result.page.html',
  styleUrls: ['./communaute-find-result.page.scss'],
})
export class CommunauteFindResultPage implements OnInit {

  // Search parameters
  date: string; 
  depDistance: number;
  depLat: number;
  depLon: number;
  desDistance: number;
  desLat: number;
  desLon: number;

  isLoading: boolean = false;

  //user_did_tutorial

  covoiturages: Covoiturage[] = [];

  constructor( 
    public alertController: AlertController, 
    public loadingController: LoadingController, 
    private covoiturageService: CovoiturageService,
    private alertService: AlertService,
    private route: ActivatedRoute) {
  }
  ngOnInit() {
    // Get query params
    this.route.queryParams.subscribe( params => {
      this.date = params['date'];
      this.depLat = params['deplat'];
      this.depLon = params['deplon'];
      this.desLat = params['deslat'];
      this.desLon = params['deslon'];
    });
  }

  ionViewDidEnter() {
    this.isLoading = true;
    this.getMatchingCovoiturages();    
  }

  getMatchingCovoiturages() {
    this.covoiturages = [];
    this.covoiturageService.getCovoiturages(this.date).then(result => {

      result.forEach(covoiturage => {

        // Get distance between searched and current departure location
        this.depDistance = this.covoiturageService.getDistanceFromLatLonInKm(
          this.depLat, this.depLon, 
          covoiturage.departureLatitude, covoiturage.departureLongitude);

        // Get distance between searched and current destination location
        this.desDistance = this.covoiturageService.getDistanceFromLatLonInKm(
          this.desLat, this.desLon, 
          covoiturage.destinationLatitude, covoiturage.destinationLongitude);
        
        // add to covoiturages if departure distance in range (< 2km)
        if (this.depDistance <= 2 && this.desDistance <=2) {
          this.covoiturages.push(covoiturage);
        }
      });
      // End loading
      this.isLoading = false;
    },
    error => {
      this.alertService.presentAlert("error", "errorOccurred");
      this.isLoading = false;
    });
  }
}


