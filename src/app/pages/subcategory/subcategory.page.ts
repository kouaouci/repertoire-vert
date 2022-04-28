import { Category } from './../../shared/category.model';

import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, NavParams, ViewWillEnter } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RepVertApiService } from 'src/app/services/rep-vert-api/RepVertApiService';
import { Subcategory } from 'src/app/shared/Subcategory.model';
import { SubcategoryService } from 'src/app/services/subcategories/subcategory.service';
import { Company } from 'src/app/shared/Company.model';
import { LocationService } from 'src/app/services/location/location.service';
import { CovoiturageService } from 'src/app/services/covoiturage/covoiturage.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.page.html',
  styleUrls: ['./subcategory.page.scss'],
})
export class SubcategoryPage implements OnInit, ViewWillEnter {

  category: Category;
  subcategory: Subcategory;
  imgUrl: string;

  // Search inputs & filters
  showSearch: boolean = false;

  cityInput: string = '';
  cityFilter: string = '';

  productInput: string = '';
  productFilter: string = '';

  orderFilter: string = 'proximity';

  // User position
  userLong: number;
  userLat: number;

  // Company lists
  companiesN0: Company[] = [];
  companiesN1: Company[] = [];
  companiesN2: Company[] = [];
  companiesN3: Company[] = [];

  constructor(
    public repVertAPI: RepVertApiService,
    private subcategoryService: SubcategoryService,
    private covoiturageService: CovoiturageService,
    private locationService: LocationService,
    private helperService: HelperService,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router) {
  }

  ngOnInit() {

    this.route.paramMap.subscribe(param => {

      // Initialize subcategory
      if (!this.subcategory) {
        // Category id
        let categoryId = parseInt(param.get('categoryId'));
        // Subcategory id
        let subcategoryId = parseInt(param.get('subcategoryId'));

        // Get subcategory details
        this.getSubcategory(categoryId, subcategoryId);
      }
    });
  }

  ionViewWillEnter() {
    this.cityInput = '';
    this.cityFilter = '';
    this.productInput = '';
    this.productFilter = '';
    this.getPosition();
  }

  getPosition() {
    this.locationService.getPosition().then(pos => {
      this.userLong = pos.lng;
      this.userLat = pos.lat;

      this.companiesN0.forEach(c => {
        c.distanceFromUser = this.getDistance(c.latitude, c.longtitude);
      });
      this.companiesN1.forEach(c => {
        c.distanceFromUser = this.getDistance(c.latitude, c.longtitude);
      });
      this.companiesN2.forEach(c => {
        c.distanceFromUser = this.getDistance(c.latitude, c.longtitude);
      });
      this.companiesN3.forEach(c => {
        c.distanceFromUser = this.getDistance(c.latitude, c.longtitude);
      });
    });
  }

  getDistance(companyLat: number, companyLong: number) {
    // Get distance between company and current location
    let distance = this.covoiturageService.getDistanceFromLatLonInKm(
      this.userLat, this.userLong, companyLat, companyLong);

    // Round distance to 2 decimals
    return Math.round(distance * 100) / 100;
  }

  getSubcategory(categoryId: number, subcategoryId: number) {

    // Get subcategory details
    this.subcategoryService.getSubcategory(categoryId, subcategoryId).then(
      result => {
        this.subcategory = result.subcategory;

        // Get subcategory image
        this.imgUrl = 'https://repertoirevert.org/css/img/category/header/subcategories/'
          + result.category + '/' + result.subcategory.name + '.jpg';

        // Get companies with products in this subcategory
        this.getSubcategoryCompanies();
      }
    );
  }

  getSubcategoryCompanies() {
    
    // Initialize company lists
    this.companiesN0 = [];
    this.companiesN1 = [];
    this.companiesN2 = [];
    this.companiesN3 = [];

    // For each product in subcategory add product company to companies
    this.subcategory.products.forEach(p => {

      // Add only if not in list
      if (this.getCompanyIndex(p.company.id, p.company.niveau) === -1) {
        // Initialize subcategories
        p.company.subcategories = [];

        // Calculate and Set distance from user
        p.company.distanceFromUser = this.getDistance(p.company.latitude, p.company.longtitude);

        // Add company to list based on niveau
        this.addCompanyToList(p.company);
      }

      // Add product subcategorie(s) in company subcategories
      p.subcategories.forEach(prodSub => {
        //let company = this.companies[this.getCompanyIndex(p.company.id)];
        let company = this.getCompanyFromList(p.company.id, p.company.niveau);

        // Add subcategory to company only if not in list
        if (this.getCompanySubcategoryIndex(company, prodSub.id) === -1) {
          company.subcategories.push(prodSub);
        }
      });
    });

    // Order by distance
    this.orderByDistance();
  }

  getCompanyIndex(id: number, niveau: string): number {
    //return this.companies.findIndex(c => c.id === id);
    switch (niveau) {
      case 'N.0': {
        return this.companiesN0.findIndex(c => c.id === id);
      }
      case 'N.1': {
        return this.companiesN1.findIndex(c => c.id === id);
      }
      case 'N.2': {
        return this.companiesN2.findIndex(c => c.id === id);
      }
      case 'N.3': {
        return this.companiesN3.findIndex(c => c.id === id);
      }
      default: {
        return -1;
      }
    }
  }

  getCompanySubcategoryIndex(company: Company, id: number): number {
    return company.subcategories.findIndex(compSub => compSub.id === id);
  }

  addCompanyToList(company: Company) {
    switch (company.niveau) {
      case 'N.0': {
        this.companiesN0.push(company);
        break;
      }
      case 'N.1': {
        this.companiesN1.push(company);
        break;
      }
      case 'N.2': {
        this.companiesN2.push(company);
        break;
      }
      case 'N.3': {
        this.companiesN3.push(company);
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  getCompanyFromList(id: number, niveau: string) {
    switch (niveau) {
      case 'N.0': {
        let index = this.companiesN0.findIndex(c => c.id === id);
        return this.companiesN0[index];
      }
      case 'N.1': {
        let index = this.companiesN1.findIndex(c => c.id === id);
        return this.companiesN0[index];
      }
      case 'N.2': {
        let index = this.companiesN2.findIndex(c => c.id === id);
        return this.companiesN0[index];
      }
      case 'N.3': {
        let index = this.companiesN3.findIndex(c => c.id === id);
        return this.companiesN0[index];
      }
      default: {
        return null;
      }
    }
  }

  filterCompanies() {
    this.cityFilter = this.cityInput;
    this.productFilter = this.productInput;
  }

  showCompany(company: Company): boolean {

    let show = true;

    // City filter
    if (this.cityFilter.trim() !== '') {
      let filter = this.helperService.normalizeString(this.cityFilter);
      let city = this.helperService.normalizeString(company.city);

      // if company city does not match filter, hide company
      if (!city.includes(filter)) {
        show = false;
      }
    }

    // Product/Service filter
    if (this.productFilter.trim() !== '') {
      // Product / Service filter
      let filter = this.helperService.normalizeString(this.productFilter);

      // By default, no product matches the filter
      let found = false;

      // If company has products
      if (company.products) {
        // For each product, find one with a name that matches the filter
        company.products.forEach(p => {
          let product = this.helperService.normalizeString(p.name);
          if (product.includes(filter)) {
            found = true;
          }
        });
      }

      // If no product found, hide company
      if (!found) {
        show = false;
      }
    }

    return show;
  }

  handleChange(event) {   
    if (event === 'alphabetical') {
      this.orderByName();
    } else {
      this.orderByDistance();
    }
  }

  orderByName() {
    this.companiesN0.sort((a, b) => a.name.localeCompare(b.name));
    this.companiesN1.sort((a, b) => a.name.localeCompare(b.name));
    this.companiesN2.sort((a, b) => a.name.localeCompare(b.name));
    this.companiesN3.sort((a, b) => a.name.localeCompare(b.name));
  }

  orderByDistance() {
    //this.companies.sort((a, b) => a.distanceFromUser > b.distanceFromUser ? 1 : -1);
    this.companiesN0.sort((a, b) => a.distanceFromUser > b.distanceFromUser ? 1 : -1);
    this.companiesN1.sort((a, b) => a.distanceFromUser > b.distanceFromUser ? 1 : -1);
    this.companiesN2.sort((a, b) => a.distanceFromUser > b.distanceFromUser ? 1 : -1);
    this.companiesN3.sort((a, b) => a.distanceFromUser > b.distanceFromUser ? 1 : -1);
  }
}
