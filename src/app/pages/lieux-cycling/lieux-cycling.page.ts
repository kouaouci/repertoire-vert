import { SuperTabsConfig } from '@ionic-super-tabs/core';
import { Component, ViewChild, ElementRef } from "@angular/core";
import * as L from "leaflet";
import { HttpClient } from "@angular/common/http";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { IonSlides, Platform } from "@ionic/angular";
import { Storage, IonicStorageModule } from "@ionic/storage";

@Component({
  selector: 'app-lieux-cycling',
  templateUrl: './lieux-cycling.page.html',
  styleUrls: ['./lieux-cycling.page.scss'],
})
export class LieuxCyclingPage  {

 
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
   properties = [];
  options;
  routeControl: any;
  addressComponent: any;
  selectOption = [
    {
      enableHighAccuracy: true,
      maxAge: 0,
      timeout: 5000,
      profile: "mapbox/cycling",
    },
  ];
  selectOption2 = {
    enableHighAccuracy: true,
    maxAge: 0,
    timeout: 5000,
    profile: "mapbox/cycling",
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
    this.map = new L.Map("mapcycling").setView([46.2044, 6.1432], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "IonicTutorial",
    }).addTo(this.map);
    fetch("https://www.repertoirevert.org/rest/product")
    .then((res) => res.json())
    .then((data) => {
      this.properties = data;
      console.log(this.properties);
      for (const marker of this.properties) {
        // return distance in meters

        //Markers color depending on the case's status, Urgent will be red, Non urgent Green
        var productMarker = new L.Icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
        
   

    
        //calculate distance betweeb points
        //à faire

        var latlng = [marker.latitude, marker.longitude];
        //reverse geociding to display the exact address of the marker
     
      
          L.marker([marker.latitude, marker.longitude], {icon:productMarker})
            .addTo(this.map)
            .bindPopup("Prix:" + marker.prix + "/KG");
        
      }
    })
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
            profile: "mapbox/cycling",
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
            profile: "mapbox/cycling",
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
            var distance = e.routes[0].summary.totalDistance;

            var time = e.routes[0].summary.totalTime;
            // Récuperer la distance et l'affecter dabs un html
            const app = document.getElementById("distancecycling");

            // 2. Create a new <p></p> element programmatically
            const p = document.createElement("p");

            // 3. Add the text content
            p.textContent = (distance / 1000).toString();

            // 4. Append the p element to the div element
            app.appendChild(p);

            const app2 = document.getElementById("timecycling");

            // 2. Create a new <p></p> element programmatically
            const p2 = document.createElement("p");

            // 3. Add the text content
            p2.textContent = Math.round((time % 3600) / 60).toString();

            // 4. Append the p element to the div element
            app2.appendChild(p2);

            const app3 = document.getElementById("caloriescycling");

            // 2. Create a new <p></p> element programmatically
            const p3 = document.createElement("p");

            // 3. Add the text content
            p3.textContent = Math.round(
              ((26 * 0.2017 - 68 * 0.0936 + 1 * 0.6309 - 55.0969) *
                Math.round((time % 3600) / 60)) /
                4.184
            ).toString();

            // 4. Append the p element to the div element
            app3.appendChild(p3);

            console.log(
              "Total distance is " +
                distance / 1000 +
                " km and total time is " +
                Math.round((time % 3600) / 60) +
                " minutes"
            );
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

}
