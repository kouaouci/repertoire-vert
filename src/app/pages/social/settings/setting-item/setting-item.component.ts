import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting-item',
  templateUrl: './setting-item.component.html',
  styleUrls: ['./setting-item.component.scss']
})
export class SettingItemComponent implements OnInit {

  @Input() title: string;
  @Input() text: string;
  @Input() activated: boolean;
  @Input() onBoarding: boolean;

  constructor() { }

  ngOnInit() {
  }

  handleToggle() {
    this.activated = !this.activated;
  }
}
