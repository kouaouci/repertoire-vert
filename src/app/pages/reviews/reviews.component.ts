import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ReviewService } from 'src/app/services/reviews/review.service';
import { Review } from 'src/app/shared/Review.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  entityType: string;
  entityId: number;

  // Prevent adding reviews for own profile or products
  own: boolean = false;
  companyId: number;

  // Tabs
  selectedSection: number = 0;

  // Consummer and Company reviews
  userReviews: Review[] = [];
  companyReviews: Review[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private reviewService: ReviewService
  ) { }

  ngOnInit() {

    // Get url to retrieve entity type and id
    let url = this.router.url;
    url = url.replace('/tabs/', '');
    url = url.replace('/reviews', '');

    const urlSegments = url.split('/');

    if (urlSegments[0] === 'companies') {
      this.entityType = 'user';
    } else {
      this.entityType = 'product';
    }

    this.entityId = parseInt(urlSegments[1]);

    // Get entity reviews
    this.getUserReviews();
  }

  checkOwnProfileOrProduct() {
    let user = this.authService.getAuthenticatedUser();

    if (user) {
      // If profile reviews
      if (this.entityType === 'user') {
        this.own = this.entityId == user.id;
      }
      // If product or service reviews
      if (this.entityType === 'product') {        
        this.own = this.companyId == user.id;
      }
    }
  }

  getUserReviews() {
    this.reviewService.getReviews(this.entityId, this.entityType).then(
      result => {
        this.userReviews = result.userReviews;
        this.companyReviews = result.companyReviews;

        // if reviewed object is a product
        if (this.entityType === 'product') {
          this.companyId = result.companyId;
        }

        // Check if own profile or product
        this.checkOwnProfileOrProduct();
      });
  }

  toggleSection(section: number) {
    this.selectedSection = section;
  }
}
