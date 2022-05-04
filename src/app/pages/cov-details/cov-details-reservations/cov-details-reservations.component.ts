import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { CovoiturageFavoritesService } from 'src/app/services/covoiturage/covoiturage-favorites.service';
import { CovoiturageParticipationService } from 'src/app/services/covoiturage/covoiturage-participation.service';
import { CovFavorite } from 'src/app/shared/CovFavorite.model';
import { CovInvitation } from 'src/app/shared/CovInvitation.model';
import { Friendship } from 'src/app/shared/friendship.model';
import { Participation } from 'src/app/shared/participation.model';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-cov-details-reservations',
  templateUrl: './cov-details-reservations.component.html',
  styleUrls: ['./cov-details-reservations.component.scss']
})
export class CovDetailsReservationsComponent implements OnInit {

  @Input() covoiturageId: number;
  @Input() nbPlaces: number;
  @Input() isCreator: boolean;
  @Input() friends: Friendship[];
  @Input() favorites: CovFavorite[];
  @Input() participations: Participation[];
  @Input() invitations: CovInvitation[];

  confirmedParticipations: Participation[] = [];
  pendingParticipations: Participation[] = [];

  showPending: boolean = true;

  // For non-creator users
  reservedAlready: boolean = false;
  ownReservationId: number;

  config = {
    id: "participants-pagination",
    itemsPerPage: 3,
    currentPage: 1,
    totalItems: 0
  };

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private participationService: CovoiturageParticipationService,
    private favoriteService: CovoiturageFavoritesService) { }

  ngOnInit() {
    // Get covoiturage id
    this.route.paramMap.subscribe(params => {
      this.covoiturageId = parseInt(params.get('id'));
    });
  }

  ngOnChanges(changes: SimpleChanges) {

    // Wait for participations
    if (changes['participations'].currentValue) {
      if (this.participations) {
        // if confirmed at to confirmed participations, else...

        // Initialize confirmed and pending participations
        this.confirmedParticipations = [];
        this.pendingParticipations = [];

        this.participations.forEach(p => {
          if (p.confirmed) {
            this.confirmedParticipations.push(p);
          } else {
            this.pendingParticipations.push(p);
          }
        });

        // Update total items with nb of pending participations
        this.config.totalItems = this.pendingParticipations.length;

        // Hide pending if max nb places reached
        if (this.confirmedParticipations.length === this.nbPlaces) {
          this.showPending = false;
        }
      }
    }
  }

  pageChanged(event) {
    this.config.currentPage = event
  }


  // For non-creator

  handleClick() {
    if (this.reservedAlready) {
      this.showCancelConfirmation();
    } else {
      this.handleReservation();
    }
  }

  handleReservation() {
    let participation: Participation = {
      covoiturageId: this.covoiturageId,
      participantId: parseInt(localStorage.getItem('repVertId'))
    }
    this.participationService.addParticipation(participation).then(result => {
      this.reservedAlready = true;
      this.ownReservationId = result;
    });
  }

  handleCancellation() {
    this.participationService.deleteParticipation(this.ownReservationId, this.covoiturageId)
      .then(result => {
        if (result) {
          this.ownReservationId = undefined;
          this.reservedAlready = false;
          this.alertService.presentAlert("success", "reservationCancelled");
        }
      });
  }

  showCancelConfirmation() {
    this.alertService.presentAlertConfirm(
      'confirmation',
      'cancelReservationConfirm',
      () => { this.handleCancellation() })
  }


  addFavorite(user: User) {
    // Create new favorite
    let favorite: CovFavorite = {
      user: parseInt(localStorage.getItem('repVertId')),
      favorite: user.id
    };

    // Add favorite to DB
    this.favoriteService.addFavorite(favorite).then(result => {
      favorite.id = result;
      // Add favorite to list
      favorite.favorite = user;
      this.favorites.push(favorite);
    });
  }

  removeFavorite(id: number) {
    // Remove from DB
    this.favoriteService.removeFavorite(id).then(result => {
      if (result) {
        // Get favorite index
        let index = this.favorites.findIndex(f => {
          let favorite = f.favorite as User;
          return favorite.id === id;
        });
        // Remove favorite from list
        this.favorites.splice(index, 1);
      }
    });
  }


  // For creator

  acceptReservation(participationId: number) {

    // Accept only if max nb of places not reached
    if (this.confirmedParticipations.length < this.nbPlaces) {
      this.participationService.acceptParticipation(participationId, this.covoiturageId)
        .then(result => {
          if (result) {
            // Get pending participation index
            let pendingIndex = this.getPendingParticipationIndex(participationId);

            // Add participation to confirmed participations
            // And remove from pending
            this.confirmedParticipations.push(this.pendingParticipations[pendingIndex]);
            this.pendingParticipations.splice(pendingIndex, 1);

            // Update participations list too
            let index = this.getParticipationIndex(participationId);
            this.participations[index].confirmed = true;

            // Update pagination nb of items
            this.config.totalItems = this.pendingParticipations.length;

            // If max nb of places readched, after accept, hide pending
            if (this.confirmedParticipations.length === this.nbPlaces) {
              this.alertService.presentAlert("success", "allPlacesConfirmed");
              this.showPending = false;
            } else {
              this.alertService.presentAlert("success", "reservationAccepted");
            }
          }
        });
    } else {
      this.alertService.presentAlert("error", "noMorePlaces");
    }
  }

  deleteReservation(participationId: number) {
    this.participationService.deleteParticipation(participationId, this.covoiturageId)
      .then(result => {
        if (result) {
          // Get participation index and remove from pending list
          let pendingIndex = this.getPendingParticipationIndex(participationId);
          this.pendingParticipations.splice(pendingIndex, 1);

          // Get participation index and remove from list
          let index = this.getParticipationIndex(participationId);
          this.participations.splice(index, 1);
        }
      })
  }

  getPendingParticipationIndex(id: number) {
    // Get participation index
    return this.pendingParticipations.findIndex(p => {
      return p.id === id;
    });
  }

  getParticipationIndex(id: number) {
    // Get participation index
    return this.participations.findIndex(p => {
      return p.id === id;
    });
  }

  getHost(id: number): User {

    let host: User;

    // Check if an invitation for this pending reservation exists
    let invitation = this.invitations.find(i => {
      let friend = i.friend as User;
      return friend.id === id;
    });

    // Return host if exists
    if (invitation) {
      let user = invitation.user as User;
      host = user;
    }
    return host;
  }

  isFriend(participantId: number) {
    // Check if participant is user's friend
    let index = this.friends.findIndex(f => {
      return f.id === participantId
    });
    return index !== -1;
  }

  isFavorite(participantId: number) {
    // Check if participant is in user's favorites
    let index = this.favorites.findIndex(f => {
      let user = f.favorite as User;
      return user.id === participantId;
    });

    return index !== -1;
  }
}
