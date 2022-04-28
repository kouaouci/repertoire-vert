import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-user-network',
  templateUrl: './user-network.page.html',
  styleUrls: ['./user-network.page.scss'],
})
export class UserNetworkPageComponent {

  filterTerm: string;
  friends: User[];

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 3,
    spaceBetween: 20,
  };

  constructor(
    private friendshipService: FriendshipService,
    private usersService: UsersService) { }

  getFriends() {
    const id = localStorage.getItem('repVertId');

    this.friends = [];
    this.friendshipService.getFriendships().subscribe(response => {
      response.forEach(friendship => {
        
        if (friendship.isAccepted) {          
          if (friendship.user.id === parseInt(id)) {
            this.friends.push(friendship.friend);
          } else {
            this.friends.push(friendship.user);
          }
        }
      });
    });
  }

  getFriend(id: number) {
    this.usersService.getUser(id).subscribe(
      response => {        
        this.friends.push(response.user)
      },
      error => {
        console.log(error);
      });
  }

  handleSearch(search: string) {
    this.filterTerm = search;
  }
}
