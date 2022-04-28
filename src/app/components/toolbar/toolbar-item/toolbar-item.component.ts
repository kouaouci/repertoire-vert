import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar-item',
  templateUrl: './toolbar-item.component.html',
  styleUrls: ['./toolbar-item.component.css']
})
export class ToolbarItemComponent implements OnInit, OnChanges {

  @Input() icon: string;
  @Input() title: string;
  @Input() notifications: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
  }
}
