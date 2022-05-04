import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import "leaflet/dist/leaflet.css";
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import "leaflet/dist/leaflet.css";
import 'leaflet-routing-machine'
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css";
import "esri-leaflet-geocoder/dist/esri-leaflet-geocoder";
import * as ELG from "esri-leaflet-geocoder";
import { Merchandise } from 'src/app/shared/Merchandise.model';



@Component({
  selector: 'app-informations-section',
  templateUrl: './informations-section.component.html',
  styleUrls: ['./informations-section.component.scss']
})
export class InformationsSectionComponent implements OnChanges {

  @Output() editEvent = new EventEmitter<string>();

  @Input() company: any;
  @Input() ownCompany: boolean;

  // Map
  map: any;
  routeControl: any;
  options = {
    enableHighAccuracy: true,
    maxAge: 0,
    timeout: 5000,
    profile: 'mapbox/driving'
  };

  // Product list
  products: Merchandise[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.company) {
      // Initialize map
      this.initializeMap(this.company.latitude, this.company.longtitude);
    }
  }

  ionViewDidLeave() {
    this.map.remove();
  }

  initializeMap(latitude: number, longitude: number) {

    // Remove exisiting map
    if (this.map !== undefined) {
      this.map = undefined;
    }

    // Initialize map
    this.delay(500).then(() => {
      this.map = new L.Map('companyMap').fitWorld();
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'gaea21'
      }).addTo(this.map);
      if (!navigator.geolocation) {
        console.log('location is not supported');
      }

      //Load nav
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = position.coords;
        const latLong = [coords.latitude, coords.longitude];

        this.routeControl = L.Routing.control({
          collapsible: true,
          show: false,
          waypoints: [
            //les remplacer avec ma propre destination et celle de l'entreprise
            L.latLng(position.coords.latitude, position.coords.longitude),
            L.latLng(latitude, longitude)
          ],
          router: (L.Routing as any).mapbox("sk.eyJ1IjoiZmplcmJpIiwiYSI6ImNra2ZkaThrdTBzOXgycHBnYzhkbzg5bXAifQ.9a3GrGk1XPDDqS-WIBBRcQ", this.options),
          routeWhileDragging: false,

        }).on('routesfound', function (e) {
          var routes = e.routes;
        }).addTo(this.map);
      });
    });
  }

  editInfo() {
    this.editEvent.emit('hi');
  }

  delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
}
