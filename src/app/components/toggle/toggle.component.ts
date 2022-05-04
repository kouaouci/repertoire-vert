import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit {
  
  @Output() changeEvent = new EventEmitter<any>();

  @Input() checked: boolean;
  @Input() onChange: any;

  constructor(public platform: Platform) { }

  ngOnInit() {   
  }

  handleChange() {
    this.changeEvent.emit();
  }
}
