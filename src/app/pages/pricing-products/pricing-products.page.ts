import { AppComponent } from './../../app.component';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { RepVertApiService } from 'src/app/services/rep-vert-api/RepVertApiService';
@Component({
  selector: 'app-pricing-products',
  templateUrl: './pricing-products.page.html',
  styleUrls: ['./pricing-products.page.scss'],
})
export class PricingProductsPage  {
filterTerm: string;
  products: any;
  ok : boolean = true;
  ok1: string = "HomePage";
  regions = ["gaea", "géneve"];
  selectedBrand: "All";
  constructor(public navCtrl: NavController, public navParams: NavController, public app: AppComponent, private repVertAPI: RepVertApiService) { 
    
	this.repVertAPI.fetchAllProducts()
  .subscribe((data: any) => this.products = data
       ,error => console.error("[CategoriesPage] Error: ", error));
      // this.navCtrl.setRoot (TabPage);

}

ionViewDidLoad() {
  console.log('ionViewDidLoad CategoryPage');
  }


}
