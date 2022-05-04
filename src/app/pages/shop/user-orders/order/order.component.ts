import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/Cart.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  @Input() order: Cart;

  date: any;
  time: any;
  status: string;

  defaultImage = '../../../../../assets/imgs/no_product.jpg';

  constructor(
    public datepipe: DatePipe) { }

  ngOnInit() {

    // Get date and time of order
    this.date = this.datepipe.transform(this.order.createdAt, 'dd-MM-yyyy');
    this.time = this.datepipe.transform(this.order.createdAt, 'HH:mm');

    // Get order status
    switch (this.order.status) {
      case "confirmed": {
        this.status = "preparation";
        break;
      }
      case "in transit": {
        this.status = "transit";
        break;
      }
      case "delivered": {
        this.status = "delivered";
        break;
      }
      default: {
        this.status = "preparation";
        break;
      }
    }
  }

  getProductImage(image: string) {

    if (image !== '' && image !== null) {
      return "https://repertoirevert.org/uploads/products/" + image;
    } else {
      return this.defaultImage;
    }
  }

}
