import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';
import { Friendship } from 'src/app/shared/friendship.model';

@Component({
  selector: 'app-friend-request-card',
  templateUrl: './friend-request-card.component.html',
  styleUrls: ['./friend-request-card.component.scss']
})
export class FriendRequestCardComponent implements OnInit {

  @Input() friendRequest: Friendship;

  confirmed = false;
  refused = false;

  constructor(
    private alertService: AlertService,
    private friendshipService: FriendshipService) { }

  ngOnInit() {
  }

  acceptRequest() {   
    this.friendshipService.acceptFriendRequest(this.friendRequest.id).subscribe(
      response => {
        this.confirmed = true;
      },
      error => {
        this.alertService.presentAlert("error", "errorOccurred");
      }
    );
  }

  deleteRequest() {
    this.friendshipService.deleteFriendRequest(this.friendRequest.id).subscribe(
      response => {
        this.refused = true;
      },
      error => {
        this.alertService.presentAlert("error", "errorOccurred");
      }
    )
  }
}
