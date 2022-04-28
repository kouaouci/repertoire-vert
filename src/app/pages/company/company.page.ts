import { Component, OnInit } from '@angular/core';
import { AnimationBuilder } from '@ionic/angular';

@Component({
  selector: 'app-company',
  templateUrl: './company.page.html',
})
export class CompanyPage implements OnInit {

  constructor() { }

  date: Date;
  customAlertOptions: any;

  ngOnInit() {
  }
}


interface InputChangeEventDetail {
  value: string | undefined | null;
}

interface ModalCustomEvent extends CustomEvent {
  target: HTMLIonModalElement;
}

interface ModalOptions {
  component: any;
  componentProps?: { [key: string]: any };
  presentingElement?: HTMLElement;
  showBackdrop?: boolean;
  backdropDismiss?: boolean;
  cssClass?: string | string[];
  animated?: boolean;
  swipeToClose?: boolean;

  mode?: 'ios' | 'md';
  keyboardClose?: boolean;
  id?: string;

  enterAnimation?: AnimationBuilder;
  leaveAnimation?: AnimationBuilder;
}


