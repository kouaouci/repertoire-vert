import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-slide',
  templateUrl: './welcome-slide.component.html',
  styleUrls: ['./welcome-slide.component.scss']
})
export class WelcomeSlideComponent implements OnInit {

  @Input() title: string;
  @Input() text: string;
  @Input() image: string;

  constructor() { }

  ngOnInit() {
  }

}
