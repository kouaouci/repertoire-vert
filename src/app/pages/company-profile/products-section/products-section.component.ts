import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/shared/Product.model';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.scss']
})
export class ProductsSectionComponent {

  @Output() addEvent = new EventEmitter<string>();

  @Input() ownCompany: boolean;
  @Input() products: Product[];
  @Input() productType: string;

  constructor() { }

  addNew() {
    if (this.productType === 'merchandise') {
      this.addEvent.emit('merchandise');
    } else {
      this.addEvent.emit('service');
    }
  }
}
