import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';
import { UsersService } from 'src/app/services/users/users.service';
import { Friendship } from 'src/app/shared/friendship.model';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit, OnDestroy {

  //Connected user
  userId: number;
  authStatusSub: Subscription;

  users: User[];
  friendships: Friendship[];
  filterTerm: string;

  isLoading = false;

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private usersService: UsersService,
    private friendshipService: FriendshipService,
    public toastController: ToastController,
    public loadingController: LoadingController) { }

  ngOnInit() {

    // Set connected user id
    if (this.authService.getAuthenticatedUser()) {
      this.userId = this.authService.getAuthenticatedUser().id;
    }

    // Listen to authentication changes
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        // Set connected user id
        this.userId = this.authService.getAuthenticatedUser().id;
      });
  }

  ionViewWillEnter() {
    this.getUsers(true);
    this.getFriendships();
  }

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe();
  }

  handleSearch(search: string) {
    this.filterTerm = search;
  }

  doRefresh(event) {
    this.getUsers(false);
    this.getFriendships();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  getUsers(spinner: boolean) {
    if (spinner) {
      this.isLoading = true;
    }
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
      this.isLoading = false;
    });
  }

  canAdd(id: number): boolean {
    if (id.toString() === localStorage.getItem('repVertId')) {
      return false;
    }
    return true;
  }

  getFriendships() {
    this.friendshipService.getFriendships().subscribe(
      response => {
        this.friendships = response;
      },
      error => {
        console.log(error);
      })
  }

  getFriendshipId(id: number) {
    const friendship = this.friendships?.find(f =>
      f.user.id == id || f.friend.id == id
    );

    if (friendship) {
      return friendship.id;
    } else {
      return 0;
    }
  }

  getStatus(id: number): string {

    const friendship = this.friendships?.find(f =>
      f.user.id == id || f.friend.id == id || f.user == id || f.friend == id
    );

    if (friendship) {

      if (friendship.isAccepted) {
        // Already friends
        return "accepted";
      } else {
        if (friendship.user.id == id) {
          // Friend request from user needs confirmation
          return "needConfirmation";
        } else {
          // Friend request already sent
          return "added";
        }
      }
    } else {
      // No friend request yet
      return "notAdded";
    }
  }

  sendRequest(friendId: number) {
    const requesterId = parseInt(localStorage.getItem('repVertId'));

    this.friendshipService.addFriend(requesterId, friendId).subscribe(
      response => {
        if (response.hasOwnProperty('friendship_id')) {
          this.friendships.push({
            user: parseInt(localStorage.getItem('repVertId')),
            friend: friendId,
            isAccepted: false,
          });
        } else {
          this.alertService.presentAlert("error", "errorOccurred");
        }
      },
      error => {
        this.alertService.presentAlert("error", "errorOccurred");
      }
    )
  }

  acceptRequest(friendshipId: number) {
    this.friendshipService.acceptFriendRequest(friendshipId).subscribe(
      response => {
        const friendship = this.friendships.find(f => f.id === friendshipId);
        const index = this.friendships.indexOf(friendship);
        this.friendships[index].isAccepted = true;
      },
      error => {
        this.alertService.presentAlert("error", "errorOccurred");
      }
    )
  }
}


