import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.scss']
})
export class UserPreferencesComponent implements OnInit {

  // Tab segment
  segment: number = 0;

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event) {
  }
}
