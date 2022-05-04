import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/shared/Review.model';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.scss']
})
export class UserReviewComponent implements OnInit {

  @Input() review: Review;

  username: string;

  // Date time
  date: any;
  time: any;

  constructor(
    private datepipe: DatePipe
  ) { }

  ngOnInit() {

    if (this.review) {
      // Get owner username
      let owner = this.review.owner as User;
      this.username = owner.username;

      // Date time information
      this.date = this.datepipe.transform(this.review.createdAt, 'dd/MM/yyyy');
      this.time = this.datepipe.transform(this.review.createdAt, 'HH:mm');
    }
  }

}
