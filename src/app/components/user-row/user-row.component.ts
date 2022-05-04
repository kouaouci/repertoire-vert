import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss']
})
export class UserRowComponent implements OnInit {

  @Input() friendshipId: number;
  @Input() user: any
  @Input() status: string;
  @Input() addable: boolean;
  @Output() addEvent = new EventEmitter<number>();
  @Output() acceptEvent = new EventEmitter<number>();

  username: string = '';

  constructor() { }

  ngOnInit() {
    this.getUsername();
  }

  getUsername() {
    if (this.user.role === 'ROLE_USER') {
      this.username = this.user.username;
    } else {
      this.username = this.user.name;
    }
  }

  handleAdd(): void {
    this.addEvent.next(this.user.id);
  }

  handleAccept(): void {
    this.acceptEvent.next(this.friendshipId)
  }

}
