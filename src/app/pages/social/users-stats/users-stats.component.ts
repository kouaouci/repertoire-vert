import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { Activity } from 'src/app/shared/activity.model';
import { Cart } from 'src/app/shared/Cart.model';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-users-stats',
  templateUrl: './users-stats.component.html',
  styleUrls: ['./users-stats.component.scss']
})
export class UsersStatsComponent implements OnInit {

  user: User;
  activities: Activity[];
  carts: Cart[];

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    if (this.location.getState().hasOwnProperty('id')) {

      let user = this.location.getState() as User;
      this.activities = user.activities;
      this.carts = user.carts;
    } else {
      this.getUserInfo();
    }
  }

  getUserInfo() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== undefined) {
      this.usersService.getUser(parseInt(id)).subscribe(
        response => {          

          this.user = response.user;
          this.activities = this.user.activities;
          this.carts = this.user.carts
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
