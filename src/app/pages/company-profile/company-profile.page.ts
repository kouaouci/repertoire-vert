import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CompanyService } from 'src/app/services/company/company.service';
import { Merchandise } from 'src/app/shared/Merchandise.model';
import { Service } from 'src/app/shared/Service.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Company } from 'src/app/shared/Company.model';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { FavoriteCompanyService } from 'src/app/services/favorites/favoriteCompany.service';
import { FavoriteCompany } from 'src/app/shared/FavoriteCompany.model';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.page.html',
  styleUrls: ['./company-profile.page.scss'],
})
export class CompanyProfilePageComponent implements OnInit {

  // Connected company profile
  ownCompany: boolean = false;
  editing: boolean = false;
  addingProduct: boolean = false;
  addingService: boolean = false;

  // Company info
  @Input() id;
  company: any;
  reviews: { 
    total: number, 
    average: number 
  };

  // Company merchandise & services
  merchandise: Merchandise[] = [];
  services: Service[] = [];

  // Company products reviews
  productsUserReviews: [];
  productsCompanyReviews: []

  // Section selected
  selectedSection: number = 0;

  // User favorites
  favorites: FavoriteCompany[];

  constructor(
    private companyService: CompanyService,
    private authService: AuthService,
    private favoriteCompanyService: FavoriteCompanyService,
    public alertController: AlertController,
    private alertService: AlertService,
    private route: ActivatedRoute,
    public toastController: ToastController) { }

  ngOnInit() {
    // Listen for favorite companies updates
    this.favoriteCompanyService.getFavoritesUpdateListener().subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  ionViewWillEnter() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getCompanyWithCategoriesAndProducts(id);

    let user = this.authService.getAuthenticatedUser();
    if (user) {
      if (user.role === 'ROLE_COMPANY' && user.id === id) {
        this.ownCompany = true;
      }
    }
  }

  toggleSection(section: number) {
    this.selectedSection = section;
  }

  toggleEditing(event) {
    this.editing = !this.editing;
  }

  toggleAddNew(event) {
    if (event === 'merchandise') {
      this.addingProduct = !this.addingProduct;
    } else if (event === 'service') {
      this.addingService = !this.addingService;
    }
  }

  getCompanyWithCategoriesAndProducts(id: number) {
    this.companyService.getCompanyWithCategoriesAndProducts(id).then(
      response => {

        // Get company and reviews from response
        this.company = response.company;
        this.reviews = response.reviews;

        // Initialize products & services
        this.merchandise = [];
        this.services = [];

        // For each company product
        this.company.products.forEach(p => {

          // Get user & company reviews
          let userReviewsIndex = response.productsUserReviews.findIndex(r => {
            return r.product.id === p.id;
          });

          let companyReviewsIndex = response.productsCompanyReviews.findIndex(r => {
            return r.product.id === p.id;
          });

          if (userReviewsIndex !== -1) {
            p.userTotalReviews = response.productsUserReviews[userReviewsIndex].total;
            p.userAverageRating = response.productsUserReviews[userReviewsIndex].average;
          }

          if (companyReviewsIndex !== -1) {
            p.companyTotalReviews = response.productsCompanyReviews[companyReviewsIndex].total;
            p.companyAverageRating = response.productsCompanyReviews[companyReviewsIndex].average;
          }

          // Separate Merchandise & Services
          if (p.discr === 'marchandise') {
            let merchandise: Merchandise = p;
            this.merchandise.push(merchandise);
          } else {
            let service: Service = p;
            this.services.push(service);
          }

          // Check if company is in user's favorites
          this.getFavorites();
        })
      },
      error => {
        this.alertService.presentAlert('error', 'errorOccurred');
      }
    );
  }

  updateCompany(updatedCompany: Company) {
    this.company = updatedCompany;
  }

  getFavorites() {

    // Get user favorites
    this.favorites = this.favoriteCompanyService.getFavoriteCompanies();

    // Check if company is in user's favorites
    this.checkFavorite();
  }

  checkFavorite() {
    let index = this.favorites.findIndex( f => {
      let company = f.company as Company;
      return company.id === this.company.id;
    });

    if (index !== -1) {
      this.company.favorite = true;
    } else {
      this.company.favorite = false;
    }
  }

  handleClick() {
    if (this.company.favorite) {
      // Remove from favorites
      this.removeFromFavorites();
    } else {
      // Add company to user favorites
      this.addToFavorites();
    }
  }

  addToFavorites() {
    // User id
    let userId = this.authService.getAuthenticatedUser().id;

    // New favorite company
    let favoriteCompany: FavoriteCompany = {
      user: userId,
      company: this.company.id
    }
    
    this.favoriteCompanyService.addFavoriteCompany(favoriteCompany, this.company).then(result => {
      if (result) {
        this.company.favorite = true;
      }
    });
  }

  removeFromFavorites() {
    // Get favorite company index from favorites
    let index = this.favorites.findIndex( f => {
      let company = f.company as Company;
      return company.id === this.company.id || f.company === this.company.id;
    });

    // Favorite company id
    let favoriteId = this.favorites[index].id;
    
    this.favoriteCompanyService.removeFavoriteCompany(favoriteId).then(result => {
      if (result) {
        this.company.favorite = false;
      }
    });
  }

  addNewProduct(event) {
    if (event.type === 'merchandise') {
      this.merchandise.unshift(event.product);
    } else {
      this.services.unshift(event.product)
    }
  }
}
