import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivityType } from 'src/app/shared/ActivityType.model';
import { Transport } from 'src/app/shared/Transport.model';

@Component({
  selector: 'app-form-choice',
  templateUrl: './form-choice.component.html',
  styleUrls: ['./form-choice.component.scss']
})
export class FormChoiceComponent implements OnInit, OnChanges {

  @Input() transport: Transport;
  @Input() activityType: ActivityType;

  @Input() id: number | string;
  @Input() nom: string;
  @Input() icon: string;
  @Input() last: boolean;
  @Input() new: boolean;

  choiceId: number | string;
  choiceName: string;

  prefix: string;

  constructor() { }

  ngOnInit() {
    if (this.new) {
      this.prefix = '';
    } else {
      this.prefix = 'activityTypes.'
    }

    if (this.transport) {
      this.prefix = 'transports.';
      this.choiceId = this.transport.id;
      this.choiceName = this.transport.name;
    }

    if (this.activityType) {
      this.prefix = 'activityTypes.';
      this.choiceId = this.activityType.id;
      this.choiceName = this.activityType.name;
    }
  }

  ngOnChanges() {
    if (this.nom) {
      this.choiceId = this.id;
      this.choiceName = this.nom;
    }
  }
}
