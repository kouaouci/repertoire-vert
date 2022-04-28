
import { Component, OnInit } from "@angular/core";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder";
import { DateService } from "src/app/services/date/date.service";
import { Router } from "@angular/router";
import { Activity } from "src/app/shared/activity.model";
import { Transport } from "src/app/shared/Transport.model";
import { TransportService } from "src/app/services/transports/transport.service";
import { ActivityTransport } from "src/app/shared/ActivityTransport.model";
import { ActivityService } from "src/app/services/activities/activity.service";
import { Subscription } from "rxjs";
import { ActivityPosition } from "src/app/shared/ActivityPosition.model";
import { LocationService } from "src/app/services/location/location.service";
import { AlertService } from "src/app/services/alerts/alert.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // Current date and time
  date: any;
  time: any;

  // Start and End date and time
  dateStart: any;
  timeStart: any;
  dateEnd: any;
  timeEnd: any;

  // Last and current location
  lastLat: number;
  lastLon: number;
  curLat: number;
  curLon: number;

  // Activity info
  distance: number = 0;
  c02Emissions: number = 0;
  displayedDistance: number = 0;
  displayedC02Emissions: number = 0;
  displayedSteps: number = 0;
  displayedCalories: number = 0;

  // Selected Transport type and other types
  transport: Transport;
  transports: Transport[];

  // Step counter and calorie counter
  showCounters: boolean = false;

  // Activity status
  activityStarted: boolean = false;
  activityPaused: boolean = false;

  // Activity test
  activity: Activity;

  // Activity subscription
  activitySub: Subscription;

  // Activity timer
  activityTimer: any;

  constructor(
    private router: Router,
    private activityService: ActivityService,
    private transportService: TransportService,
    private locationService: LocationService,
    private dateService: DateService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    // Subscribe to activities updates
    this.activitySub = this.activityService.getActivitiesUpdateListener()
    .subscribe(activities => {

      if (this.router.url === '/tabs/co2/home') {
        let index = activities.findIndex(a => {
          return a.status === 'Current';
        });
  
        if (index !== -1) {
         this.activity = activities[index];
  
         if (this.transports) {
          this.transport = this.transports[0];
         }
        } else {
          this.router.navigate(['/tabs/form-options-co2']);
        }
      }
    });
  }

  ionViewDidEnter() {

    // Get transport types
    this.getTransports().then( result => {
      
      /*if (this.router.getCurrentNavigation()) {
        // Get Activity from form
        this.activity = this.router.getCurrentNavigation().extras.state;
        console.log(this.activity);
        
        let transportId = this.activity.transport as number;
        this.setTransport(transportId);
      }*/
      if (this.activityService.getCurrentActivity() !== null) {
        
        // Get ongoing activity of user
        this.activity = this.activityService.getCurrentActivity();

        // Set transport, if exists
        if (!this.transport && this.activity.transport) {
          let transportId = this.activity.transport as number;
          this.setTransport(transportId);
        }
      }
    });
    
    // Get current date and time
    this.date = this.dateService.getDate(new Date());
    this.time = this.dateService.getTime(new Date());
  }

  isOnFoot() {
    // Show step and calorie counter only if on foot
    let index = this.activity.activityTransports.findIndex( t => {
      let transport = t.transport as Transport;
      return transport.id === 1;
    });
    if (index !== -1) {
      return true;
    } else {
      return false;
    }
  }

  start() {
    // Activity started
    this.activityStarted = true;
    
    // Set activity date and time started
    this.activity.dateTimeStart = new Date();
    this.dateStart = this.dateService.getDate(new Date());
    this.timeStart = this.dateService.getTime(new Date());

    // Get position
    navigator.geolocation.getCurrentPosition(pos => {

      // Set activity start position
      this.activity.latStart = pos.coords.latitude;
      this.activity.lonStart = pos.coords.longitude;

      // Set as last position
      this.lastLat = pos.coords.latitude;
      this.lastLon = pos.coords.longitude;

      // Update activity every 5 seconds
      this.activityTimer = setInterval(() => this.refresh(), 5000);
    });
  }

  pause() {

    // Update on pause
    this.refresh();

    // Pause activity
    this.activityPaused = true;
    clearInterval(this.activityTimer);
  }

  unpause() {
    // UnPause activity
    this.activityPaused = false;
    this.activityTimer = setInterval(() => this.refresh(), 5000);
  }

  stop() {
    // Activity ended
    clearInterval(this.activityTimer);
    this.activityTimer = null;

    // Set activity date and time started
    this.activity.dateTimeEnd = new Date();
    this.dateEnd = this.dateService.getDate(new Date());
    this.timeEnd = this.dateService.getTime(new Date());

    // Update info only if unpaused
    if (!this.activityPaused) {
      
      // Update before saving
      this.refresh().then(result => {
        if (result) {
          // Save to DB
          this.saveToDB();
        }
      });
    } else {

      // Just save without updating again
      this.saveToDB();
    }

  }

  handleCancel() {
    this.alertService.presentAlertConfirm(
      "confirmation", 
      "cancelActivity", 
      () => {this.deleteActivity()});
  }

  deleteActivity() {
    this.activityService.deleteActivity(this.activity.id).then( result => {
      if (result) {
        this.router.navigate(['/tabs/profile']);
      }
    })
  }

  refresh(): Promise<boolean> {

    return new Promise((resolve, reject) => {
      // Verify if activity transport is set
      if (!this.activity.transport) {
        this.activity.transport = 1;
      }

      // Verify if transport is set
      if (!this.transport) {
        this.transport = this.transports.find(a => {
          return a.id === this.activity.transport;
        })
      }

      // Update info
      this.updateInfo().then(result => {
        if (result) {
          resolve(true);
        }
      });
    });
  }

  updateInfo(): Promise<boolean> {

    return new Promise((resolve, reject) => {

      // Get position
      navigator.geolocation.getCurrentPosition(pos => {

        // Current position
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;
        
        // Get distance between last and current position
        let distance = this.locationService.getDistanceFromLatLonInKm(
        this.lastLat, this.lastLon, lat, lon);

        // Calculate C02 emissions based on transport and distance
        let c02emissions = this.calculateC02(distance);

        // Calculate User steps and calories based on distance, if on foot
        if (this.transport.id === 1) {
          this.calculateCalories(distance, 1);
        }

        // If user moved more than 2 meters get position
        if (distance >= 0.002) {
          // Create new activity position
          let activityPosition: ActivityPosition = {
            activity: this.activity.id,
            latitude: lat,
            longitude: lon,
            createdAt: new Date()
          }

          // Add new position to activity positions
          if (!this.activity.activityPositions) {
            this.activity.activityPositions = [];
          }
          this.activity.activityPositions.push(activityPosition);
        }

        // Update/Set distance and c02 for selected transport
        this.updateTransport(distance, c02emissions);
          
        // Set current position as last position
        this.lastLat = lat;
        this.lastLon = lon;
        this.activity.latEnd = lat;
        this.activity.lonEnd = lon;

        // Set activity total distance
        this.activity.totalDistance += distance;
        this.displayedDistance = Math.round(this.activity.totalDistance * 100) / 100;
        
        // Set activity total c02 emissions
        this.activity.totalC02 += c02emissions;
        this.displayedC02Emissions = Math.round(this.activity.totalC02 * 100) / 100;
      
        // Task done
        resolve(true);
      });

    });
  }

  saveToDB() {
    // Save activity to DB
    this.activityService.updateActivity(this.activity).then(result => {
      if (result) {
        // Redirect to profile
        this.router.navigate(['/tabs/profile']);

        // Reset activity form
        this.resetForm();
      }
    });
  }

  updateTransport(distance: number, c02emissions: number) {

    // Activity Transport
    let activityTransport: ActivityTransport;

    // Get selected transport in transports
    activityTransport = this.activity.activityTransports.find( t => {
      let transport = t.transport as Transport;
      return transport.id == this.transport.id;
    });

    // Add new if not in transports yet
    if (activityTransport === undefined) {

      // Set activity transport
      activityTransport = {
        activity: this.activity.id,
        transport: this.transport,
        distance: 0,
        c02Emissions: 0
      }
      
      // Add new activity transport to activity transports
      this.activity.activityTransports.push(activityTransport);
    }

    // Update distance and c02 emissions for selected transport
    activityTransport.distance += distance;
    activityTransport.c02Emissions += c02emissions;
  }

  calculateC02(distance: number): number {
    // Actual value
    let c02Emissions = distance * (this.transport.c02PerKm / 100);
    return c02Emissions;
  }

  calculateSteps(distance: number) {
    let steps = distance * this.activityService.getStepsPerKm();
    // Update activity steps
    this.activity.steps += steps;
    this.displayedSteps = Math.round(this.activity.steps);
    return steps;
  }

  calculateCalories(distance: number, transport: number) {
    let calories;

    if (transport === 1) { // On foot
      let steps = this.calculateSteps(distance);
      calories = steps * this.activityService.getCaloriesPerStep()
    }

    // Update activity calories
    this.activity.calories += calories;
    this.displayedCalories = Math.round(this.activity.calories);
  }
  changeTransport(event) {

    // Get selected transport id
    let transportId = event.target.value;
    
    // Get selected transport and set as current transport
    this.transport = this.transports.find( t => {
      return t.id === transportId;
    });
  }

  getTransports(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.transportService.getTransports().then( result => {
        this.transports = result;
        resolve();
      });
    });
  }

  setTransport(transportId: number) {
    this.transport = this.transports.find( t => {
      return t.id === transportId;
    });   
  }

  getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  resetForm() {
    this.activity = undefined;
    this.transport = undefined;
    this.activityStarted = undefined;
    this.activityPaused = undefined;
    this.displayedC02Emissions = 0;
    this.displayedDistance = 0;
    this.dateStart = undefined;
    this.timeStart = undefined;
  }
}

