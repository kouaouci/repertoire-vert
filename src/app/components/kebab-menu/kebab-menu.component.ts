import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-kebab-menu',
  templateUrl: './kebab-menu.component.html',
  styleUrls: ['./kebab-menu.component.scss']
})
export class KebabMenuComponent implements OnInit {

  @Input() creatorId: number;
  @Input() report: Function;
  @Input() delete: Function;

  ownPost: boolean;

  constructor() { }

  ngOnInit() {
    if (this.creatorId === parseInt(localStorage.getItem('repVertId'))) {
      this.ownPost = true;
    } else {
      this.ownPost = false;
    }
  }

  reportEvent() {
    this.report();
  }

  deleteEvent() {
    this.delete();
  }
}
