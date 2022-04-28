import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Review } from 'src/app/shared/Review.model';

@Component({
  selector: 'app-user-rating-form',
  templateUrl: './user-rating-form.component.html',
  styleUrls: ['./user-rating-form.component.scss']
})
export class UserRatingFormComponent implements OnInit {

  @Output() submitEvent = new EventEmitter<Review>();

  review: Review;
  comment: FormControl = new FormControl('');

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    let userId = this.route.snapshot.params['id'];

    this.review = {
      value: 0,
      entityId: userId,
      entityType: 'user',
      comment: ''
    }
  }

  updateStars(stars: number) {
    this.review.value = stars;
  }

  handleSubmit() {
    if (this.review.value > 0) {
      let comment = this.comment.value.trim();

      if (comment !== '') {
        this.review.comment = this.comment.value.trim();
      }

      // Set connected user as review owner
      let userId = this.authService.getAuthenticatedUser().id;
      this.review.owner = userId;

      this.submitEvent.emit(this.review);
    }
  }
}
