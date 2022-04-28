import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DateService } from 'src/app/services/date/date.service';
import { Review } from 'src/app/shared/Review.model';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.scss']
})
export class UserRatingComponent implements OnInit, OnChanges {

  @Input() review: Review;

  owner: User;

  date: any;
  time: any;

  constructor(
    private dateService: DateService
  ) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.review) {
      this.owner = this.review.owner as User;
      
      this.date = this.dateService.getDate(this.review.createdAt);
      this.time = this.dateService.getTime(this.review.createdAt);
    }
  }
}
