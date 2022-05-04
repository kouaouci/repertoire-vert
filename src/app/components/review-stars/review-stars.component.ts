import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-stars',
  templateUrl: './review-stars.component.html',
  styleUrls: ['./review-stars.component.css']
})
export class ReviewStarsComponent {

  @Input() stars: number;
  @Input() color: string;

  constructor() { }
}
