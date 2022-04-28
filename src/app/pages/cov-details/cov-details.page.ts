import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine'
import { ViewDidLeave } from '@ionic/angular';
import { Covoiturage } from 'src/app/shared/Communauty.model';
import { User } from 'src/app/shared/user.model';
import { CovoiturageService } from 'src/app/services/covoiturage/covoiturage.service';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';
import { CovoiturageFavoritesService } from 'src/app/services/covoiturage/covoiturage-favorites.service';
import { Friendship } from 'src/app/shared/friendship.model';
import { CovFavorite } from 'src/app/shared/CovFavorite.model';
import { CovInvitation } from 'src/app/shared/CovInvitation.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-cov-details',
  templateUrl: './cov-details.page.html',
  styleUrls: ['./cov-details.page.scss'],
})
export class CovDetailsPage implements OnInit, ViewDidLeave {

  /* Back Url */
  backUrl: string;

  /* Creator info */
  creator: User;
  isCreator: boolean;

  /* Covoiturage information */
  id: number
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

  /* Invitations, Friends and favorites */
  invitations: CovInvitation[] = [];
  friends: Friendship[] = [];
  favorites: CovFavorite[] = [];

  constructor(
    private authService: AuthService,
    private covoiturageService: CovoiturageService,
    private friendshipService: FriendshipService,
    private favoriteService: CovoiturageFavoritesService,
    private route: ActivatedRoute) { }


  ngOnInit() {
    // Get covoiturage id
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id'));

      // Initialize Map
      this.mapId = 'cov-details-map-' + this.id;
    });
  }


  ionViewDidEnter() {

    // if covoiturage recently created, get info from query params, else server
    let params = this.route.snapshot.queryParamMap;

    if (params.get('id')) { // Fetch info from query params
      // Set backUrl
      this.backUrl = '/tabs/covoiturage';

      // Initialize covoiturage
      this.initializeCovoiturageFromParams(params);

      // Get creator info from local storage
      this.creator = this.authService.getAuthenticatedUser();

      this.isCreator = true;
    } else { // Fetch info from server
      // Initialize covoiturage from server
      this.initializeCovoiturageFromServer();
    }
  }


  ionViewDidLeave() {
    this.map.remove();
  }


  checkIfCreator() {
    if (this.covoiturage.createur.id === parseInt(localStorage.getItem('repVertId'))) {
      this.isCreator = true; // à changer
    } else {
      this.isCreator = false;
    }
  }


  initializeCovoiturageFromParams(params: ParamMap) {
    // Initialize covoiturage from query params
    this.covoiturage = {
      id: parseInt(params.get('id')),
      createur: parseInt(params.get('createur')),
      departuredate: new Date(params.get('departuredate')),
      arrivalDate: new Date(params.get('arrivalDate')),
      departure: params.get('departure'),
      departureLatitude: parseFloat(params.get('departureLatitude')),
      departureLongitude: parseFloat(params.get('departureLongitude')),
      destination: params.get('destination'),
      destinationLatitude: parseFloat(params.get('destinationLatitude')),
      destinationLongitude: parseFloat(params.get('destinationLongitude')),
      groupmaxsize: parseInt(params.get('groupmaxsize')),
      roundTrip: params.get('roundTrip') === 'true',
      returnDate: new Date(params.get('returnDate')),
      trunk: params.get('trunk'),
      roof: params.get('roof') === 'true',
      trailer: params.get('trailer') === 'true',
      participations: [],
      invitations: []
    }

    // Initialize map
    this.initializeMap();

    // Get user friends and favorites
    this.getFriends();
    this.getFavorites();
  }


  initializeCovoiturageFromServer() {
    this.covoiturageService.getCovoiturage(this.id).then(
      result => {
        this.covoiturage = result;
        this.creator = result.createur;

        // Initialize map
        this.initializeMap();

        // Check if covoiturage's creator is current user
        this.checkIfCreator();

        // Get user friends and favorites
        this.getFriends();
        this.getFavorites();

        // Get user invitations
        this.getUserInvitations();
      }
    );
  }


  initializeMap() {
    // Remove exisiting map
    if (this.map !== undefined) {
      this.map = undefined;
    }

    // Initialize map
    this.delay(500).then(() => {
      this.map = new L.Map(this.mapId).fitWorld();
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Gaea21"
      }).addTo(this.map);

      // Add waypoints and route
      this.addRouteToMap();
    });
  }


  addRouteToMap() {

    if (L.Routing) {
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
      }).addTo(this.map);
      this.routeControl.on('routesfound', function (e) {
        var distance = e.routes[0].summary.totalDistance;
        var time = e.routes[0].summary.totalTime;
      });
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


  getUserInvitations() {

    let userId = this.authService.getAuthenticatedUser().id;

    this.covoiturage.invitations.forEach(i => {
      let user = i.user as User;

      if (user.id == userId) {
        this.invitations.push(i);
      }
    });   
  }


  getFriends() {
    // Initialize friends
    this.friends = [];
    this.friendshipService.getFriendships().subscribe(
      response => {
        response.forEach(f => {
          // Get only accepted friends
          if (f.isAccepted) {
            if (f.user.id === parseInt(localStorage.getItem('repVertId'))) {
              this.friends.push(f.friend);
            } else {
              this.friends.push(f.user);
            }
          }
        });
      },
      error => {
        console.log(error);
      }
    )
  }

  getFavorites() {
    let id = parseInt(localStorage.getItem('repVertId'));
    // Initialize favorites
    this.favorites = [];
    this.favoriteService.getFavorites(id).then(result => {
      result.forEach(f => {
        this.favorites.push(f);        
      });
    })
  }


  isFavorite() {
    // Check if driver is in user's favorites
    let index = this.favorites.findIndex(f => {
      let user = f.favorite as User;
      return user.id === this.covoiturage.createur.id;
    });
    return index !== -1;
  }


  addFavorite() {
    // Create new favorite
    let favorite: CovFavorite = {
      user: parseInt(localStorage.getItem('repVertId')),
      favorite: parseInt(this.covoiturage.createur.id)
    };

    // Add favorite to DB
    this.favoriteService.addFavorite(favorite).then(result => {
      favorite.id = result;
      // Add favorite to list
      favorite.favorite = this.covoiturage.createur;
      this.favorites.push(favorite);
    });
  }

  removeFavorite() {
    let favoriteId: number = this.covoiturage.createur.id;
    // Remove from DB
    this.favoriteService.removeFavorite(favoriteId).then(result => {
      if (result) {
        // Get favorite index
        let index = this.favorites.findIndex(f => {
          let favorite = f.favorite as User;
          return favorite.id === favoriteId;
        });
        // Remove favorite from list
        this.favorites.splice(index, 1);
      }
    });
  }
}
