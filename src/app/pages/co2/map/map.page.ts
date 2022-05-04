import { Component, OnDestroy, OnInit } from "@angular/core";
import * as L from 'leaflet';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { ActivityService } from "src/app/services/activities/activity.service";
import { Activity } from "src/app/shared/activity.model";

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],

})
export class MapPage implements OnInit, OnDestroy {
  
  /* Map */
  map: any;
  routeControl: any;
  options = {
    enableHighAccuracy: true,
    maxAge: 0,
    timeout: 5000,
    profile: 'mapbox/driving'
  };

  // Activity
  activityId: number;
  activity: Activity;

  private routeSub: Subscription;

  constructor(
    private activityService: ActivityService,
    public route: ActivatedRoute,
    public toastController: ToastController) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      // Activity id
      this.activityId = parseInt(params['id']);

      // Get activity info
      this.activity = this.activityService.getActivity(this.activityId);

      if (this.activity) {
        // Initialize map
        this.initializeMap();
      }
    });
  }

  ionViewDidLeave() {
    this.map.remove();
  }

  initializeMap() {
    // Remove exisiting map
    if (this.map !== undefined) {
      this.map = undefined;
    }

    // Initialize map
    this.delay(500).then(() => {
      this.map = new L.Map('co2map').fitWorld();
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Gaea21"
      }).addTo(this.map);

      // Add waypoints and route
      this.addRouteToMap();
    });
  }


  addRouteToMap() {

    // Initialize activity positions
    let positions = [];

    // Sort positions by date descending
    this.activity.activityPositions.sort((a,b) => {
      let dateA = a.createdAt as any;
      let dateB = b.createdAt as any;
      return dateB - dateA;
    });

    if (L.Routing) {
      // Add route for departure to destination
      this.routeControl = L.Routing.control({
        collapsible: true,
        show: false,
        addWaypoints: false,
        waypoints: [
          // Add departure and destination coordinates
          //L.latLng(this.activity.latStart, this.activity.lonStart),
          //L.latLng(this.activity.latEnd, this.activity.lonEnd) 
        ],
        router: (L.Routing as any).mapbox("sk.eyJ1IjoiZmplcmJpIiwiYSI6ImNra2ZkaThrdTBzOXgycHBnYzhkbzg5bXAifQ.9a3GrGk1XPDDqS-WIBBRcQ", this.options),
        routeWhileDragging: false,
      }).on('routesfound', function (e) {
        var routes = e.routes;
      }).addTo(this.map);

      // Add starting position to list and create visible marker
      positions.push(L.latLng(this.activity.latStart, this.activity.lonStart));
      L.marker([this.activity.latStart, this.activity.lonStart], {})
        .addTo(this.map).dragging.disable();

      // Add each activity positions to list and create invinsible marker
      this.activity.activityPositions.forEach(p => {
        positions.push(L.latLng(p.latitude, p.longitude));
        L.marker([p.latitude, p.longitude], {
          opacity: 0
        }).addTo(this.map).dragging.disable();
      });

      // Create visible marker for end position
      L.marker([this.activity.latEnd, this.activity.lonEnd], {})
        .addTo(this.map).dragging.disable();

      // Create activity route based on positions and add to map
      let polyline = new L.Polyline(positions, {
        color: 'red',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
      });
      polyline.addTo(this.map);

      // set the view
      let zoom = 15;
      this.map.setView([this.activity.latStart, this.activity.lonStart], zoom);
    } else {
      // Wait for leaflet to initialize, then reinitialize map
      this.delay(500).then(() => {
        this.initializeMap();
      })
    }
  }


  delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  reload() {
    // Get activity info
    this.activity = this.activityService.getActivity(this.activityId);
    console.log(this.activity);
    
    // Initialize map
    this.initializeMap();
  }

  ngOnDestroy(): void {
      this.routeSub.unsubscribe();
  }

}
