import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SubcategoriesModalComponent } from 'src/app/components/subcategories-modal/subcategories-modal.component';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { FileService } from 'src/app/services/file/file.service';
import { ProductService } from 'src/app/services/products/product.service';
import { Category } from 'src/app/shared/category.model';
import { Merchandise } from 'src/app/shared/Merchandise.model';
import { Service } from 'src/app/shared/Service.model';
import { Subcategory } from 'src/app/shared/Subcategory.model';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit, OnChanges {

  @Output() backEvent = new EventEmitter<any>();
  @Output() newProductEvent = new EventEmitter<{ product: Merchandise | Service, type: string }>();

  @Input() type: string;

  productForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    sellType: new FormControl('unit', Validators.required),
    weight: new FormControl(''),
    volume: new FormControl(''),
    price: new FormControl(0, Validators.required),
    currency: new FormControl('CHF', Validators.required),
    origin: new FormControl('', Validators.required),
    certification: new FormControl('', Validators.required),
    packaging: new FormControl('', Validators.required),
    height: new FormControl(''),
    width: new FormControl(''),
    depth: new FormControl(''),
    duration: new FormControl(''),
    subcategories: new FormControl('')
  });

  // Product image
  filePath: string;

  // Loading
  loading: boolean = false;

  // Categories and subcategories
  categories: Category[];
  subcategories: Subcategory[];
  selectedSubcategories: Subcategory[];

  constructor(
    private productService: ProductService,
    private categoryService: CategoriesService,
    private authService: AuthService,
    private modalController: ModalController,
    private fileService: FileService,
    private alertService: AlertService) { }

  ngOnInit(): void {

    // Get categories and subcategories
    this.getCategoriesWithSubcategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.type) {
      if (this.type === 'service') {
        this.productForm.controls['sellType'].clearValidators();
        this.productForm.controls['origin'].clearValidators();
        this.productForm.controls['packaging'].clearValidators();
      }
    }
  }

  handleBack() {
    if (this.type === 'merchandise') {
      this.backEvent.emit('merchandise');
    } else {
      this.backEvent.emit('service');
    }
  }

  resetForm() {
    Object.keys(this.productForm.controls).forEach(key => {
      this.productForm.get(key).setValue('');
    });
  }

  handleImage(e) {
    const file = (e.target as HTMLInputElement).files[0];

    if (file) {
      this.productForm.patchValue({
        image: file
      });

      this.productForm.get('image').updateValueAndValidity()

      const reader = new FileReader();
      reader.onload = () => {
        this.filePath = reader.result as string;
      }
      reader.readAsDataURL(file);
    } else {
      this.productForm.patchValue({
        image: null
      });

      this.filePath = '';
    }
  }

  handleSubmit() {

    if (this.productForm.valid) {
      // Loading true
      this.loading = true;

      // Upload image first
      this.uploadImage();
    }
  }

  uploadImage() {
    // Get image file
    let imageFile: File = this.productForm.get('image').value;

    // Check if file size is larger than 2MB
    if (imageFile.size > 2000000) {
      this.alertService.presentAlert('error', 'fileTooBig')
      this.loading = false;
    } else {

      this.fileService.uploadImage('products', imageFile).then(result => {
        // Once image uploaded, save product info to DB
        this.saveProductToDB(result);
      }, error => {
        this.loading = false;
      });
    }
  }

  saveProductToDB(imageName: string) {
    // Create new product
    let product = new Object();

    // Set company info and product type
    product['company'] = this.authService.getAuthenticatedUser().id;
    product['niveau'] = this.authService.getAuthenticatedUser().niveau;
    product['discr'] = this.type === 'merchandise' ? "marchandise" : "service";

    Object.keys(this.productForm.controls).forEach(key => {
      let value = this.productForm.get(key).value;

      // Get form values
      if (key !== 'image' && key !== 'subcategories' && typeof value !== 'number') {
        if (value.trim() !== '') {
          product[key] = value.trim();
        }
      } else if (key === 'image') {
        product['image'] = imageName;
      } else {
        product[key] = value;
      }
    });

    // Get type for API URL
    let type = '';
    if (this.type === 'merchandise') {
      type = 'products';
    } else {
      type = 'services';
    }

    // Add new product to DB
    this.productService.addProduct(product, type).then(
      result => {

        this.loading = false;

        // Set id of new product
        product['id'] = result;

        // Notify parent
        if (this.type === 'merchandise') {
          this.newProductEvent.emit({ product: product, type: 'merchandise' });
        } else {
          this.newProductEvent.emit({ product: product, type: 'service' });
        }

        // Go back to products
        if (this.type === 'merchandise') {
          this.backEvent.emit('merchandise');
        } else {
          this.backEvent.emit('service');
        }
      },
      error => {
        this.loading = false;
      });
  }

  getCategoriesWithSubcategories() {

    this.categories = [];
    this.subcategories = [];

    this.categoryService.getCategoriesWithSubcategories().then(result => {
      this.categories = result;
      result.forEach(c => {

        // Add all subcategories to list
        c.subcategories.forEach(s => {
          this.subcategories.push({ id: s.id, name: s.name });
        });
      })
    });
  }

  handleSelect(event) {

    // Initialize selected subcategories
    this.selectedSubcategories = [];

    // For each selection
    event.detail.value.forEach(id => {

      // Add subcategory to selected
      let subcategory = this.subcategories.find(s => {
        return s.id === id;
      });

      this.selectedSubcategories.push(subcategory);
    });
  }

  removeSubcategory(id) {
    // Remove subcategory from selected
    let index = this.selectedSubcategories.findIndex(subcategory => {
      return subcategory.id === id;
    });
    this.selectedSubcategories.splice(index, 1);

    // Remove from form control
    let subcategories = this.productForm.get('subcategories').value;
    let index2 = subcategories.findIndex(subcategory => {
      return subcategory === id;
    });
    subcategories.splice(index2, 1);
  }

  updateSelectedSubcategories(subcategories) {

    // Initialize selected subcategories
    this.selectedSubcategories = [];
    this.productForm.controls['subcategories'].setValue([]);
    
    // Get subcategory for each subcategory id
    subcategories.forEach(id => {

      // Add subcategory to form
      this.productForm.get('subcategories').value.push(id);
      
      // Get selected subcategory
      let subcategory = this.subcategories.find( s => {
        return s.id === id;
      });

      // Get category of subcategory
      let category = this.categories.find( c => {
        return c.subcategories.find( s => {
          return s.id === id;
        });
      });
      // Add category to subcategory categories
      subcategory.categories = [{id: category.id, name: category.name}];

      // Add subcategory to selected
      this.selectedSubcategories.push(subcategory);
    });
  }

  async presentModal() {

    // Create modal
    const modal = await this.modalController.create({
      component: SubcategoriesModalComponent,
      componentProps: {
        categories: this.categories,
        productSubcategories: this.selectedSubcategories,
        close: () => { this.modalController.dismiss(); }
      },
      cssClass: 'custom-modal'
    });

    // Retrieve data on close
    modal.onDidDismiss().then( data => {
      if (data.data) {
        this.updateSelectedSubcategories(data.data);
      }
    });

    return await modal.present();
  }
}
