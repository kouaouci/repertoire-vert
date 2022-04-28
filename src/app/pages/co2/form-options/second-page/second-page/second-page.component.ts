import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Transport } from 'src/app/shared/Transport.model';
import { FormChoiceComponent } from '../../form-choice/form-choice/form-choice.component';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss']
})
export class SecondPageComponent implements OnInit {

  @Output() choiceEvent = new EventEmitter<number>();

  @Input() transports: Transport[];

  selectedTransport: string;

  constructor() { }

  ngOnInit() {
  }

  handleChange(event) {
    
    let transportId = parseInt(event.target.value);
    
    this.choiceEvent.emit(transportId);
  }
  
}
