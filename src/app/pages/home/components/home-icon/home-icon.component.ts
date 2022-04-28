import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-icon',
  templateUrl: './home-icon.component.html',
  styleUrls: ['./home-icon.component.scss']
})
export class HomeIconComponent implements OnInit {

  @Input() label: string;
  @Input() icon: string;
  @Input() color: string;
  @Input() loggedIn: boolean;

  constructor() { }

  ngOnInit() {
  }

}
