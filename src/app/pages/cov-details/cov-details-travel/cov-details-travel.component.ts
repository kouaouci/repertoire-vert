import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CovoiturageService } from 'src/app/services/covoiturage/covoiturage.service';
import { Covoiturage } from 'src/app/shared/Communauty.model';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-cov-details-travel',
  templateUrl: './cov-details-travel.component.html',
  styleUrls: ['./cov-details-travel.component.scss']
})
export class CovDetailsTravelComponent implements OnInit, OnChanges {

  @Output() addFavoriteEvent = new EventEmitter();
  @Output() removeFavoriteEvent = new EventEmitter();

  @Input() covoiturage: Covoiturage;
  @Input() creator: User;

  // If driver is in user's favorites
  @Input() favorite: boolean;

  // If current user is the creator of this covoiturage
  isCreator: boolean = false;

  arrivalDate: any;
  arrivalTime: any;

  returnDate: any;
  returnTime: any;

  trunk: string;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private covoiturageService: CovoiturageService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() { }

  ngOnChanges() {
    if (this.covoiturage) {
      // Check if current user is covoiturage's creator
      this.checkIfCreator();

      // Get arrival date and time of covoiturage
      this.arrivalDate = this.datePipe.transform(this.covoiturage.arrivalDate, 'dd/MM/yyyy');
      this.arrivalTime = this.datePipe.transform(this.covoiturage.arrivalDate, 'HH:mm');

      // Get return date and time of covoiturage, if any
      if (this.covoiturage.roundTrip) {
        this.returnDate = this.datePipe.transform(this.covoiturage.returnDate, 'dd/MM/yyyy');
        this.returnTime = this.datePipe.transform(this.covoiturage.returnDate, 'HH:mm');
      }
    }
  }

  deleteCovoiturage() {
    this.covoiturageService.deleteCovoiturage(this.covoiturage.id);
  }

  showDeleteConfirm() {
    this.alertService.presentAlertConfirm(
      "confirmation",
      "deleteCarpoolConfirm",
      () => { this.deleteCovoiturage() }
    );
  }

  checkIfCreator() {

    let userId = this.authService.getAuthenticatedUser().id;

    if (this.creator.id == userId) {
      this.isCreator = true;
    } else {
      this.isCreator = false;
    }
  }

  handleFavorite() {
    // Add to favorites if not in favorites
    if (this.favorite) {
      this.removeFavoriteEvent.emit();
    } else {
      this.addFavoriteEvent.emit();
    }
  }
}
