
import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import {Storage} from '@ionic/storage';
import { Subscription } from 'rxjs';


@Injectable()
export class LocationTrackerProvider {

  isTracking: boolean;
  positionSubscription: Subscription;
  public watch: any;
  public speed;
  public lat: number = 0;
  public lng: number = 0;
  public positions: any = [];
  public previousTracks: any = [];
  public backgroundTracks: any = [];

  constructor(private geolocation: Geolocation,
              private backgroundGeolocation: BackgroundGeolocation,
              public zone: NgZone,
              private storage: Storage) {

  }

  startTracking() {
    this.getForegroundLocation();
    this.startBackgroundLocation();
  }

  stopTracking() {
    let newRoute = { finished: new Date().getTime(), path: this.positions };
    this.previousTracks.push(newRoute);
    this.storage.set('routes', this.previousTracks);

    this.isTracking = false;
    this.positionSubscription.unsubscribe();
    this.backgroundGeolocation.stop();
  }

  getForegroundLocation() {
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).subscribe((position: Geoposition) => {
      this.positions.push({lat: position.coords.latitude, lng: position.coords.longitude,speed:position.coords.speed});
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.speed=   position.coords.speed *3.6 ;
     
      });
    });
  }

  startBackgroundLocation() {
    // Background Tracking
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config).then((location) => {
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
        this.speed =  location.speed *3.6  ;
      });
      this.backgroundTracks.push({lat: this.lat, lng: this.lng,speed:this.speed});

    }, (err) => {
      console.log(err);

    });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();
  }




}
