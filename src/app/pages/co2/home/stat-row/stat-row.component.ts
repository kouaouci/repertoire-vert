import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat-row',
  templateUrl: './stat-row.component.html',
  styleUrls: ['./stat-row.component.scss'],
  styles: [`
    hr {
      background-color: var(--color);
    }

    .circle {
      border-color: var(--color)
    }
  `]
})
export class StatRowComponent implements OnInit {

  @HostBinding("style.--color")
  @Input() color: string;
  @Input() title: string;
  @Input() icon: string;
  @Input() number: string;

  constructor() { }

  ngOnInit() {
  }

}
