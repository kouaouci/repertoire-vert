import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Covoiturage } from 'src/app/shared/Communauty.model';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-user-offer-card',
  templateUrl: './user-offer-card.component.html',
  styleUrls: ['./user-offer-card.component.scss']
})
export class UserOfferCardComponent implements OnInit {

  // Events for accepting or deleting a covoiturage reservation
  @Output() acceptEvent = new EventEmitter<number>();
  @Output() deleteEvent = new EventEmitter<number>();

  // Event for inviting users to covoiturage
  @Output() inviteEvent = new EventEmitter<User>(); 
  @Output() cancelEvent = new EventEmitter<number>();

  // Event for adding / removing from favorites
  @Output() addFavoriteEvent = new EventEmitter<User>();
  @Output() removeFavoriteEvent = new EventEmitter<number>();

  // User appearing on card
  @Input() user: User;

  // Get type of card (covoiturage, reservation, ...)
  @Input() type: string;

  // If covoiturage search result
  @Input() covoiturage: Covoiturage;

  // If covoiturage reservation
  @Input() participationId: number;
  
  // If covoiturage reservation, and user has been invited
  @Input() host: User;
  @Input() invitationId: number;

  // If user is friends with connected user
  @Input() isFriend: boolean;

  // If user is in user's favorites
  @Input() isFavorite: boolean;

  // If user already invitation
  @Input() invited: boolean;

  // If user already participating
  @Input() participating: string;

  // Departure / Arrival date and time
  depDate: any;
  depTime: any;
  arrDate: any;
  arrTime: any;

  username: string = '';

  // Number of stars to display
  // Full, Half, or None
  stars = [
    'full',
    'full',
    'full',
    'full',
    'none'
  ]

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
    if (this.user) {
      this.username = this.user.firstname + ' ' + this.user.lastname;
    } else {
      this.username = this.covoiturage.createur.firstname + ' ' + this.covoiturage.createur.lastname;
    }

    if (this.covoiturage) {
      // Get date and time of departure
      this.depDate = this.datePipe.transform(this.covoiturage.departuredate, 'dd/MM/yyyy');
      this.depTime = this.datePipe.transform(this.covoiturage.departuredate, 'HH:mm');
    
      // Get date and time of arrival
      this.arrDate = this.datePipe.transform(this.covoiturage.arrivalDate, 'dd/MM/yyyy');
      this.arrTime = this.datePipe.transform(this.covoiturage.arrivalDate, 'HH:mm');
    }
  }

  handleAccept() {
    this.acceptEvent.emit(this.participationId);
  }

  handleDelete() {
    this.deleteEvent.emit(this.participationId);
  }

  handleInvite() {
    if (!this.invited) {
      this.inviteEvent.emit(this.user);
    }
  }

  handleCancelInvite() {
    this.cancelEvent.emit(this.invitationId);
  }

  handleFavorite() {
    if (!this.isFavorite) {
      this.addFavoriteEvent.emit(this.user);
    } else {
      this.removeFavoriteEvent.emit(this.user.id);
    }
  }
}
