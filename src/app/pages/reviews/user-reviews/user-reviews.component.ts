import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReviewService } from 'src/app/services/reviews/review.service';
import { Review } from 'src/app/shared/Review.model';

@Component({
  selector: 'app-user-reviews',
  templateUrl: './user-reviews.component.html',
  styleUrls: ['./user-reviews.component.scss']
})
export class UserReviewsComponent implements OnInit {

  @Input() reviewsType: string;
  @Input() reviews: Review[];
  @Input() entityType: string;
  @Input() entityId: number;
  @Input() own: boolean;

  // New review fields
  stars: number = 0;
  comment: string = '';
  maxCharacters = 250;
  remainingCharacters = 250;

  constructor(
    private authService: AuthService,
    private reviewService: ReviewService
  ) { }

  ngOnInit() {
  }

  showForm() {

    // If own profile or product, prevent adding a review
    if (this.own) {
      return false;
    }

    // Show new review form only if user role is the same as selected tab
    let user = this.authService.getAuthenticatedUser();
    if (user) {
      if (this.reviewsType === 'user') {
        if (user.role === 'ROLE_USER') {
          return true;
        } else {
          return false;
        }
      } else {
        if (user.role === 'ROLE_COMPANY') {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  addReview() {

    if (this.stars > 0) {
      // Create new review
      let review: Review = {
        owner: this.authService.getAuthenticatedUser().id,
        entityId: this.entityId,
        entityType: this.entityType,
        value: this.stars,
        comment: this.comment.trim()
      }

      // Add review to DB
      this.reviewService.addReview(review).then(result => {
        // Update review id, createdAt and owner username
        review.id = result.reviewId;
        review.createdAt = result.reviewDate;
        review.owner = this.authService.getAuthenticatedUser();

        // Add new review to reviews
        this.reviews.unshift(review);
      });

      // Reset form
      this.stars = 0;
      this.comment = '';
    }
  }

  handleStars(number: number) {
    this.stars = number;
  }

  countCharacters() {
    this.remainingCharacters = this.maxCharacters - this.comment.length;
  }
}
