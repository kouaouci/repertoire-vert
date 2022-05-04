import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.page.html',
  styleUrls: ['./users-profile.page.scss'],
})
export class UsersProfilePage implements OnInit {

  // User info
  user: User;
  dateBirth: Date;
  age: number;
  inscriptionYear: number;

  // User ratings
  rating: number;
  nbReviews: number;

  // User covoiturages
  covoiturages: number;
  passengers: number;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== undefined) {
      this.usersService.getUser(parseInt(id)).subscribe(
        response => {

          // Get user
          this.user = response.user;

          // Update user age and get year of account creation
          this.dateBirth = this.user.dateBirth;
          this.inscriptionYear = new Date(this.user.inscriptiondate).getFullYear();
          this.getAge();

          // Get number of reviews and average rating
          if (response.reviews) {
            this.rating = parseFloat(response.reviews.average);
            this.nbReviews = response.reviews.total;
          } else {
            this.rating = 0;
            this.nbReviews = 0;
          }

          // Get number of covoiturages
          this.covoiturages = this.user.covoiturages.length;
          
          // Get number of passengers
          this.passengers = 0;
          this.user.covoiturages.forEach(c => {
            this.passengers += c.participations.length;
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  getAge(): void {
    if (this.dateBirth) {
      var timeDiff = Math.abs(Date.now() - new Date(this.dateBirth).getTime());
      this.age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
  }

  getIcon(id: number) {

    let basePath = '../../../../assets/imgs/profile_autre/';

    switch (id) {
        case 1: {
          return basePath + 'chat_ok.svg';
        }
        case 2: {
          return basePath + 'fumer_interdit.svg';
        }
        case 3: {
          return basePath + 'musique_ok.svg';
        }
        case 4: {
          return basePath + 'animaux_interdit.svg';
        }
        default: {
          return basePath + 'check.svg';
        }
    }
  }
}
