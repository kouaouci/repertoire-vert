import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { AuthService } from 'src/app/services/auth//auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { FavoriteService } from 'src/app/services/favorites/favorite.service';
import { ProductService } from 'src/app/services/products/product.service';
import { Cartline } from 'src/app/shared/Cartline.model';
import { Product } from 'src/app/shared/Product.model';
import { Location } from '@angular/common';
import { Merchandise } from 'src/app/shared/Merchandise.model';
import { Service } from 'src/app/shared/Service.model';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { Category } from 'src/app/shared/category.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Subcategory } from 'src/app/shared/Subcategory.model';
import { ModalController } from '@ionic/angular';
import { SubcategoryService } from 'src/app/services/subcategories/subcategory.service';
import { SubcategoriesModalComponent } from 'src/app/components/subcategories-modal/subcategories-modal.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  // Product info
  product: Product;
  productId: number;
  currency: string = '';
  image = '';
  defaultImage = '../../../../../assets/imgs/no_product.jpg';

  // Product reviews
  userReviewsTotal: number;
  userReviewsAverage: number;
  companyReviewsTotal: number;
  companyReviewsAverage: number;

  // Merchandise or service
  merchandise: Merchandise;
  service: Service;

  // User Favorite
  isFavorite: boolean;

  // User cart
  isInCart: boolean;
  cartQuantity = 0;
  cartline: Cartline;
  private cartSub: Subscription;

  // Own product
  ownProduct: boolean = false;
  editing: boolean = false;

  // Quantity to add
  quantity: number = 1;

  // Categories and subcategories
  categories: Category[];
  subcategories: Subcategory[];
  selectedSubcategories: Subcategory[];
  subcategoryImgBaseUrl: string;

  // Product form for editing
  productForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
    sellType: new FormControl(''),
    weight: new FormControl(''),
    volume: new FormControl(''),
    price: new FormControl(''),
    currency: new FormControl(''),
    origin: new FormControl(''),
    certification: new FormControl(''),
    packaging: new FormControl(''),
    height: new FormControl(''),
    width: new FormControl(''),
    depth: new FormControl(''),
    serviceduration: new FormControl(''),
    subcategories: new FormControl('')
  });

  loading: boolean = false;

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private productService: ProductService,
    private cartService: CartService,
    private favoriteService: FavoriteService,
    private categoryService: CategoriesService,
    private subcategoryService: SubcategoryService,
    private modalController: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location) { }

  ngOnInit() {

    this.route.paramMap.subscribe(paramMap => {
      this.productId = parseInt(paramMap.get('id'));
    });

    // Get user cart and check if product is in cart
    this.checkProductIsInCart(this.cartService.getCart());

    // Listen for cart updates
    this.cartSub = this.cartService.getCartUpdateListener().subscribe(cart => {
      this.checkProductIsInCart(cart);
    });

    // Get categories and subcategories
    this.getCategoriesWithSubcategories();

    // Get subcategory image base url
    this.subcategoryImgBaseUrl = this.subcategoryService.IMG_URL;
  }

  ionViewWillEnter() {
    this.getProductInfo();
    this.checkProductIsFavorite();
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }

  getProductInfo() {
    this.productService.getProduct(this.productId).subscribe(data => {
      let response = data as any;

      // Set product
      this.product = response.product;

      // Set merchandise or service
      if (this.product.discr === 'marchandise') {
        console.log('yo');
        
        this.merchandise = this.product;
      } else {
        console.log('service');
        
        this.service = this.product;
      }

      // Check if own product
      let userId = this.authService.getAuthenticatedUser().id;

      if (this.product.company.id === userId) {
        this.ownProduct = true;
      } else {
        this.ownProduct = false;
      }

      // Add product subcategories to selected
      this.selectedSubcategories = [];
      this.productForm.controls['subcategories'].setValue([]);
      this.product.subcategories.forEach( s => {
        this.selectedSubcategories.push(s);
        this.productForm.get('subcategories').value.push(s.id);
      });

      // Get product currency
      this.getCurrency();

      // Get product image
      this.getImage();

      // Set reviews
      if (response.userReviews[0]) {
        this.userReviewsTotal = response.userReviews[0].total;
        this.userReviewsAverage = response.userReviews[0].average;
      }
      if (response.companyReviews[0]) {
        this.companyReviewsTotal = response.companyReviews[0].total;
        this.companyReviewsAverage = response.companyReviews[0].average;
      }
    });
  }

  getCurrency() {
    if (this.product.currency.toUpperCase() === 'CHF') {
      this.currency = 'CHF';
    } else {
      this.currency = 'EUR';
    }
  }

  getImage() {
    if (this.product.image !== '') {
      this.image = this.productService.IMG_URL + this.product.image;
      //this.image = this.product.image;
    } else {
      this.image = this.defaultImage;
    }
  }

  getCategoriesWithSubcategories() {

    this.categories = [];
    this.subcategories = [];

    this.categoryService.getCategoriesWithSubcategories().then(result => {

      this.categories = result;

      result.forEach( c => {
        // Add all subcategories to list
        c.subcategories.forEach( s => {
          this.subcategories.push({ id: s.id, name: s.name });
        })
      })
    });
  }

  handleImageError(img) {
    img.src = this.defaultImage;
  }

  checkProductIsInCart(cart: Cartline[]) {
    const cartline = cart.find(c => {
      let product = c.produit as Product;
      return product.id === this.productId;
    });

    if (cartline) {
      this.isInCart = true;
      this.cartline = cartline;
    } else {
      this.isInCart = false;
    }
  }

  checkProductIsFavorite() {
    let userId = this.authService.getAuthenticatedUser().id;

    this.favoriteService.checkProductIsFavorite(userId, this.productId).subscribe(
      response => {
        if (response.code === 404) {
          this.isFavorite = false;
        } else {
          this.isFavorite = true;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    this.cartService.addToCart(this.productId, this.quantity, this.product);
  }

  addOrRemoveFavorite() {
    if (this.isFavorite) {
      this.removeFromFavorites();
    } else {
      this.addToFavorites();
    }
  }

  addToFavorites() {
    let userId = this.authService.getAuthenticatedUser().id;

    this.favoriteService.addProductToFavorites(this.productId, userId).subscribe(
      response => {
        this.isFavorite = true;
      },
      error => {
        console.log(error);
        this.alertService.presentAlert("error", "errorOccurred");
      }
    )
  }

  removeFromFavorites() {
    let userId = this.authService.getAuthenticatedUser().id;

    this.favoriteService.removeFromFavorites(this.productId, userId).subscribe(
      response => {
        if (response.code === 404) {
          this.alertService.presentAlert("error", "errorOccurred");
        } else {
          this.isFavorite = false;
        }
      },
      error => {
        console.log(error);
        this.alertService.presentAlert("error", "errorOccurred");
      }
    )
  }

  toggleEdit() {
    this.editing = !this.editing;
  }

  handleDelete() {
    this.alertService.presentAlertConfirm('confirmation', "deleteProductConfirm", () => {
      this.deleteProduct();
    });
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id).then(result => {
      if (result) {
        //this._location.back();
        let id = this.authService.getAuthenticatedUser().id;
        this.router.navigate(['/tabs/company-profile/' + id]);
      }
    });
  }

  removeSubcategory(id) {
    // Remove subcategory from selected
    let index = this.selectedSubcategories.findIndex( subcategory => {
      return subcategory.id === id;
    });
    this.selectedSubcategories.splice(index, 1);

    // Remove from form control
    let subcategories = this.productForm.get('subcategories').value;
    let index2 = subcategories.findIndex( subcategory => {
      return subcategory === id;
    });
    subcategories.splice(index2, 1);
  }

  handleConfirm() {

    this.loading = true;

    // Updated product values
    let updates: Merchandise | Service = {
      id: this.product.id,
      type: this.product.discr
    };

    Object.keys(this.productForm.controls).forEach(key => {
      let value = this.productForm.get(key).value;

      // Get form values
      if (key !== 'image' && key !== 'subcategories' && typeof value !== 'number') {
        if (value.trim() !== '') {
          updates[key] = value.trim();
        }
      } else if (key === 'image') {
        //updates['image'] = imageName;
      } else {
        updates[key] = value;
      }
    });

    // Update product values
    this.productService.updateProduct(updates).then( result => {

      this.loading = false;
      this.updateProduct(updates)
      this.resetForm;
      this.editing = false;
    });
  }

  updateProduct(updates: Merchandise | Service) {
    Object.keys(updates).forEach(key => {
      let value = updates[key];
      
      // Update currency
      if (key === 'currency') { this.currency = value; }

      // Update product details
      if (key !== 'subcategories') {
        this.product[key] = value;
      } else {
        // Update product subcategories
        this.product.subcategories = [];
        this.selectedSubcategories.forEach( s => {
          this.product.subcategories.push(s);
        });
      }
    });
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

  resetForm() {
    Object.keys(this.productForm.controls).forEach(key => {
      this.productForm.get(key).setValue('');
    });
  }
}
