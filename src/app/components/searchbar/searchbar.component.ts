import { 
  Component, 
  Input, 
  Output,
  EventEmitter,
  OnInit } from '@angular/core';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  @Input() text: string;
  @Output() searchEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  handleChange(event) {
    const search = event.detail.value;
    this.searchEvent.emit(search)
  }
}
