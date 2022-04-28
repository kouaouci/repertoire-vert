
import { LieuxDrivingPage } from './../lieux-driving/lieux-driving.page';
import { SuperTabsConfig } from '@ionic-super-tabs/core';
import { Component, ViewChild, ElementRef } from "@angular/core";
import * as L from "leaflet";
import { HttpClient } from "@angular/common/http";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { IonSlides, Platform } from "@ionic/angular";
import { Storage, IonicStorageModule } from "@ionic/storage";
@Component({
  selector: 'app-lieux-walking',
  templateUrl: './lieux-walking.page.html',
  styleUrls: ['./lieux-walking.page.scss'],
})
export class LieuxWalkingPage  {

  @ViewChild("map", { static: false }) mapContainer: ElementRef;
  @ViewChild("slides", { static: false }) slider: IonSlides;
  base_url: string;
  map: any;
  marker: L.Marker;
  segment = 0;
  searchKey: string;
  searchKeyPro:string;
  places: any = [];
  products: any = [];
  isMarkerSet: boolean = false;
  Transportmethod: any;
  image: any;
  objectName:any;
  certification:any;
  options;
  routeControl: any;
  addressComponent: any;
  selectOption = [
    {
      enableHighAccuracy: true,
      maxAge: 0,
      timeout: 5000,
      profile: "mapbox/driving",
    },
  ];
  selectOption2 = {
    enableHighAccuracy: true,
    maxAge: 0,
    timeout: 5000,
    profile: "mapbox/walking",
  };
  constructor(
    public http: HttpClient,
    private geolocation: Geolocation,
    private platform: Platform,
    private storage: Storage
  ) {
    this.base_url = "https://www.repertoirevert.org/rest/";
  }
  ionViewWillEnter() {
    console.log(this.marker);
    this.loadMap();
  }
  segmentChanged(ev) {
    console.log("segment change", ev.target.value);
    this.slider.slideTo(ev.target.value);
  }
  slideChanged() {
    this.slider.getActiveIndex().then((index) => {
      this.segment = index;
    });
  }
  search() {
    let url = this.base_url + "company/search/name/" + this.searchKey;
    this.http.get(url).subscribe((data: any) => {
      console.log(data);
      this.places = data;
    });
  }
  searchPro() {
    let url = this.base_url + "product/search/name/" + this.searchKeyPro;
    this.http.get(url).subscribe((data: any) => {
      console.log(data);
      this.products = data;
    });
  }
  onClickPickAddress(lat, lng) {
    this.places = [];
    this.products = [];
    console.log("0");

    this.setMarkertWithAnimation(lat, lng, false);
  }
  loadMap() {
    this.map = L.map("map").fitWorld();
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Gaea21",
      maxZoom: 30,
    }).addTo(this.map);

    // For Web
    this.map
      .locate({
        setView: true,
        maxZoom: 30,
      })
      .on("locationfound", (e) => {
        console.log(e);
        if (!this.platform.is("cordova")) {
          console.log("Platform is Web");
          this.setMarkertWithAnimation(e.latitude, e.longitude, true);
        }
      });
    // For Mobile
    if (this.platform.is("cordova")) {
      this.geolocation
        .getCurrentPosition()
        .then((resp) => {
          console.log("Platform is android/ios");
          this.setMarkertWithAnimation(
            resp.coords.latitude,
            resp.coords.longitude,
            true
          );
        })
        .catch((error) => {
          console.log("Error getting location", error);
        });
    }

    // Adding Map Click Event
    this.map.on("click", (e) => {
      console.log("Map Clicked");
      this.setMarkertWithAnimation(e.latlng.lat, e.latlng.lng, false);
    });
  }

  setMarkertWithAnimation(lat, lng, force: boolean) {
    if (!force) {
      console.log("marker was already there so removing it...");
      console.log("before remove", this.marker);
      // this.map.removeLayer(this.marker);
      // this.marker = null;
      this.marker.remove();
      this.marker = L.marker([lat, lng], {
        draggable: false,
      }).on("click", () => {
        console.log("marker clicked");
      });
      if (!navigator.geolocation) {
        console.log('location is not supported');
      }
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = position.coords;
        const latLong = [coords.latitude, coords.longitude];
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
      this.http
        .get(this.base_url + "company/search/name/" + this.searchKey)
        .subscribe((data: any) => {
         
          this.addressComponent = data[0].region;
          this.image = data[0].image;
          this.searchKey = data[0].name;
          this.objectName= data[0].name
          this.certification= data[0].certification
          let options = {
            enableHighAccuracy: true,
            maxAge: 0,
            timeout: 5000,
            profile: "mapbox/walking",
          };
          console.log(options.profile);
          this.routeControl = L.Routing.control({
            fitSelectedRoutes: true,
            collapsible: true,
            show: false,

            lineOptions: {
              addWaypoints: false,
              extendToWaypoints: false,
              missingRouteTolerance: 1,
            },
            waypoints: [
              //les remplacer avec ma propre destination et celle de l'entreprise
              L.latLng(position.coords.latitude, position.coords.longitude),
              L.latLng(data[0].latitude, data[0].longitude),
            ],

            router: (L.Routing as any).mapbox(
              "sk.eyJ1IjoiZmplcmJpIiwiYSI6ImNra2ZkaThrdTBzOXgycHBnYzhkbzg5bXAifQ.9a3GrGk1XPDDqS-WIBBRcQ",
              this.selectOption2
            ),

            routeWhileDragging: false,
          })
            .on("routesfound", function (e) {
              var routes = e.routes;
            })
            .addTo(this.map);
          this.routeControl.on("routesfound", function (e) {
          

         
          });
        });
        this.http
        .get(this.base_url + "product/search/name/" + this.searchKeyPro)
        .subscribe((data: any) => {
          console.log("Address Data", data[0].region);
          console.log("tEEEEEEEEST"+data[0].company.latitude)
          this.addressComponent = data[0].region;
          this.image = data[0].image;
          this.searchKeyPro = data[0].name;
          this.objectName= data[0].name
          this.certification= data[0].certification
          let options = {
            enableHighAccuracy: true,
            maxAge: 0,
            timeout: 5000,
            profile: "mapbox/walking",
          };
          console.log(options.profile);
          this.routeControl = L.Routing.control({
            fitSelectedRoutes: true,
            collapsible: true,
            show: false,

            lineOptions: {
              addWaypoints: false,
              extendToWaypoints: false,
              missingRouteTolerance: 1,
            },
            waypoints: [
              //les remplacer avec ma propre destination et celle de l'entreprise
              L.latLng(position.coords.latitude, position.coords.longitude),
              L.latLng(data[0].latitude, data[0].longitude),
            ],

            router: (L.Routing as any).mapbox(
              "sk.eyJ1IjoiZmplcmJpIiwiYSI6ImNra2ZkaThrdTBzOXgycHBnYzhkbzg5bXAifQ.9a3GrGk1XPDDqS-WIBBRcQ",
              this.selectOption2
            ),

            routeWhileDragging: false,
          })
            .on("routesfound", function (e) {
              var routes = e.routes;
            })
            .addTo(this.map);
          this.routeControl.on("routesfound", function (e) {
          
          });
        })   });
    } else {
      this.marker = L.marker([lat, lng], {
        draggable: false,
      }).on("click", () => {
        console.log("marker clicked");
      });
      this.map.addLayer(this.marker);
      this.map.setView({ lat, lng }, this.map.getZoom(), {
        animate: true,
        pan: {
          duration: 4,
        },
      });
    }
    setTimeout(() => {
      this.map.invalidateSize();
    }, 500);
  }
  changeTransport() {
    if (this.Transportmethod == "driving") {
      this.options.profile = "mapbox/driving";
    } else if (this.Transportmethod == "walking") {
      this.options.profile = "mapbox/walking";
    }
  }
}
