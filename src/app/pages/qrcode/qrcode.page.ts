import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {
	products: any[] = [];
	selectedProduct: any;
	productFound:boolean = false;
  data: any;
  brands: any;
  name: any;
  serving: any;
  serving_quantity: any;
  sodium: any;
  potassium: any;
  carbs: any;    
  fiber: any;
  sugars: any;
  proteins: any;
  vitamina: any;
  vitaminc: any;
  calcium: any;
  iron: any;
  isok: any;
  constructor(private barcodeScanner: BarcodeScanner, private toast: ToastController, private http : HttpClient) { 
  
  }

  scanProduct(){
	this.barcodeScanner.scan()
	.then((barcodeData: any) => {
	// Exemple de requête: http://world.openfoodfacts.org/api/v0/product/3596710324385
	this.http.get('http://world.openfoodfacts.org/api/v0/product/'+barcodeData.text)
		.subscribe((data: any) => {
		if (!data.product) return;
		console.log("dataaaa", data.product);
		// TODO: gestion d'erreur quand article non trouvé
		// if (!data.status_verbose == "product find") return;
		this.data = data.product;
			  this.brands = data.product.brands;
		this.name = this.data.product_name;
		this.serving = this.data.serving_size || 'N/A';
		this.serving_quantity = this.data.serving_quantity || 'N/A';
		this.sodium = this.data.nutriments.sodium_value || 'N/A';
		this.potassium = this.data.nutriments.potassium || 'N/A';
		this.carbs = this.data.nutriments.carbohydrates_value || 'N/A';
		this.fiber = this.data.nutriments.fiber_value || 'N/A';
		this.sugars = this.data.nutriments.sugars_value || 'N/A';
		this.proteins = this.data.nutriments.proteins_value || 'N/A';
		//this.vitamina = this.data.nutriments.vitamin-a_value || 'N/A';		
		//this.vitaminc = this.data.nutriments.vitamin-c_value || 'N/A';
		this.vitamina = 'N/A';
		this.vitaminc = 'N/A';
		this.calcium = this.data.nutriments.calcium_value || 'N/A';
		this.iron = this.data.nutriments.iron_value || 'N/A';
		this.isok = "ok" || 'N/A';
		},
			   error => { console.log("Connexion internet requise."); });	
	}).catch(err => console.log('Error', err));
  }
  ngOnInit() {
  }
  scan() {
    this.selectedProduct = {};
    this.barcodeScanner.scan().then(async (barcodeData) => {
      this.selectedProduct = this.products.find(product => product.code === barcodeData.text);
      if(this.selectedProduct !== undefined) {
        this.productFound = true;
        console.log(this.selectedProduct);
      } else {
        this.selectedProduct = {};
        this.productFound = false;
		const toast = await this.toast.create({
			message: 'Produt not found',
			duration: 2000
		  });
		  toast.present();
      }
    }, (err) => {
      this.toast.create(err)
        toast => {
          console.log(toast);
        }
    
    });
  }
}
