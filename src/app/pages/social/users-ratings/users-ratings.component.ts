import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReviewService } from 'src/app/services/reviews/review.service';
import { Review } from 'src/app/shared/Review.model';

@Component({
  selector: 'app-users-ratings',
  templateUrl: './users-ratings.component.html',
  styleUrls: ['./users-ratings.component.scss']
})
export class UsersRatingsComponent implements OnInit {

  reviews: Review[];

  reviewStars: number[];
  rating: number;

  constructor(
    private authService: AuthService,
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    // Initialize review list
    this.getUserReviews();
  }

  getUserReviews() {
    this.reviews = [];

    const id = this.route.snapshot.paramMap.get('id');
    if (id !== undefined) {
      this.reviewService.getReviews(parseInt(id), 'user').then( result => {
        this.reviews = result.userReviews;

        this.updateStars();
      });
    }
  }

  submitReview(review: Review) {

    this.reviewService.addReview(review).then( result => {

      review.owner = this.authService.getAuthenticatedUser();
      
      review.id = result.reviewId;
      review.createdAt = result.reviewDate

      // Add review to list
      this.reviews.unshift(review);
    });
  }

  updateStars() {
    // Initialize stars array and average rating
    this.reviewStars = [0,0,0,0,0];
    this.rating = 0;

    this.reviews.forEach(review => {
      this.reviewStars[review.value - 1] += 1;
      this.rating += review.value;
    });

    if (this.rating > 0) {
      this.rating = this.rating / this.reviews.length;
    }
  }
}
