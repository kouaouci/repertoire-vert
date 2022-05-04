import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-icon',
  templateUrl: './menu-icon.component.html',
  styleUrls: ['./menu-icon.component.scss']
})
export class MenuIconComponent implements OnInit {

  @Input() icon: string;
  @Input() name: string;
  @Input() link: string;

  constructor() { }

  ngOnInit() {
  }

}
