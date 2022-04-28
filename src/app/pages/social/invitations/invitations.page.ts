import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';
import { Friendship } from 'src/app/shared/friendship.model';
@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.page.html',
  styleUrls: ['./invitations.page.scss'],
})
export class InvitationsPage implements OnInit {

  friendRequests: Friendship[];

  constructor(
    private friendshipService: FriendshipService,
    public alertController: AlertController,
    public toastController: ToastController) { }

  ngOnInit() {
    this.friendRequests = [];
  }

  ionViewWillEnter() {
    this.getRequests();
  }

  doRefresh(event) {
    this.getRequests();

    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  getRequests() {
    this.friendRequests = [];
    const userId = parseInt(localStorage.getItem('repVertId'));
    this.friendshipService.getFriendships().subscribe(
      response => {
        response.forEach(request => {
          if (request.friend.id === userId && request.isAccepted !== true) {
            this.friendRequests.push(request);
          }
        });
      },
      error => {
        console.log(error);
      });
  }
}
