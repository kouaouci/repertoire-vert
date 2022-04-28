import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ViewDidEnter, ViewDidLeave } from '@ionic/angular';
import * as L from 'leaflet';
import { CovoiturageService } from 'src/app/services/covoiturage/covoiturage.service';
import { Covoiturage } from 'src/app/shared/Communauty.model';

@Component({
  selector: 'app-covoiturage-offre',
  templateUrl: './covoiturage-offre.component.html',
  styleUrls: ['./covoiturage-offre.component.scss']
})
export class CovoiturageOffreComponent implements OnInit, ViewDidEnter, ViewDidLeave {

  /* Covoiturage offre information */
  isDataLoaded = false;
  id: string;
  covoiturage: Covoiturage;

  /* Map */
  map: any;
  mapId: string;
  routeControl: any;
  options = {
    enableHighAccuracy: true,
    maxAge: 0,
    timeout: 5000,
    profile: 'mapbox/driving'
  };

  covoiturageForm = new FormGroup({
    dateTime: new FormControl(''),
    dateTimeReturn: new FormControl(''),
    passengers: new FormControl(1),
    return: new FormControl(true),
    trunk: new FormControl('small'),
    roof: new FormControl(false),
    trailer: new FormControl(false)
  });

  passengerOptions = {
    header: "Nombre de passagers"
  }

  constructor(
    private covoiturageService: CovoiturageService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      //this.id = params.get('id');
      this.id = 'new';
      this.mapId = 'cov-offer-map-' + this.id;
      this.isDataLoaded = true;
    });

    // Initialize covoiturage from previous page
    let params = this.route.snapshot.queryParamMap;
    this.covoiturage = {
      createur: parseInt(params.get('createur')),
      departure: params.get('departure'),
      destination: params.get('destination'),
      departuredate: params.get('departuredate'),
      departureLatitude: parseFloat(params.get('departureLatitude')),
      departureLongitude: parseFloat(params.get('departureLongitude')),
      destinationLatitude: parseFloat(params.get('destinationLatitude')),
      destinationLongitude: parseFloat(params.get('destinationLongitude'))
    }

    // Set placeholder for departure date and return date
    this.covoiturageForm.controls['dateTime'].setValue(this.covoiturage.departuredate);
    this.covoiturageForm.controls['dateTimeReturn'].setValue(this.covoiturage.departuredate);
  }

  ionViewDidEnter() {
    this.initializeMap();
  }

  ionViewDidLeave() {
    this.map.remove();
  }

  initializeMap() {
    if (this.map !== undefined) {
      this.map.remove();
    }

    // Initialize map
    this.map = new L.Map(this.mapId).fitWorld();
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "gaea21"
      //maxZoom: 30,
    }).addTo(this.map);

    // Add route for departure to destination
    this.routeControl = L.Routing.control({
      collapsible: true,
      show: false,
      waypoints: [
        // Add departure and destination coordinates
        L.latLng(this.covoiturage.departureLatitude, this.covoiturage.departureLongitude),
        L.latLng(this.covoiturage.destinationLatitude, this.covoiturage.destinationLongitude)
      ],
      router: (L.Routing as any).mapbox("sk.eyJ1IjoiZmplcmJpIiwiYSI6ImNra2ZkaThrdTBzOXgycHBnYzhkbzg5bXAifQ.9a3GrGk1XPDDqS-WIBBRcQ", this.options),
      routeWhileDragging: false,

    }).on('routesfound', function (e) {
      var routes = e.routes;
      var summary = routes[0].summary;
      // Estimated time of travel
      let travelTime = Math.round(summary.totalTime % 3600 / 60)

      // Add to local storage so that we can get it from outside this function
      localStorage.setItem('travelTime', travelTime.toString());
    }).addTo(this.map);
  }

  createOffer() {
    // Set number of places
    this.covoiturage.groupmaxsize = this.covoiturageForm.controls['passengers'].value;

    // Set date of departure
    let newDepDate: Date = new Date(this.covoiturageForm.controls['dateTime'].value);
    this.covoiturage.departuredate = newDepDate.toISOString();

    // Set round trip, and return date time if true
    this.covoiturage.roundTrip = this.covoiturageForm.controls['return'].value;
    if (this.covoiturage.roundTrip) {
      // Set date of return
      let newReturnDate: Date = new Date(this.covoiturageForm.controls['dateTimeReturn'].value);
      this.covoiturage.returnDate = newReturnDate.toISOString();
    } else {
      this.covoiturage.returnDate = null;
    }

    // Set trunk, roof and trailer
    this.covoiturage.trunk = this.covoiturageForm.controls['trunk'].value;
    this.covoiturage.roof = this.covoiturageForm.controls['roof'].value;
    this.covoiturage.trailer = this.covoiturageForm.controls['trailer'].value;

    // Get travel time from local storage and set arrival time
    let traveltime = parseInt(localStorage.getItem('travelTime'));
    this.covoiturage.arrivalDate = new Date(newDepDate.getTime() + traveltime*60000).toISOString();
    
    // Create new covoiturage offer
    this.covoiturageService.addCovoiturageOffer(this.covoiturage).then(
      result => {
        // Add new id to covoiturage
        this.covoiturage.id = result;
        // Redirect to covoiturage details page
        this.router.navigate(['/tabs/covoiturage-details/' + result],
          { queryParams: this.covoiturage });
      },
      error => {
        this.presentAlert("Erreur", "Une erreur est survenue, veuillez réessayer");
      }
    );
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Veuillez patienter...',
      duration: 1000
    });
    await loading.present();
    await loading.onDidDismiss();
  }

  async presentAlert(header: string, message: string) {
    // Message d'erreur
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
