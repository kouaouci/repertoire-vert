import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Category } from 'src/app/shared/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categories: Category[] = [];
  private categoriesUpdated = new Subject<Category[]>();

  //API_URL = environment.url + 'rest';
  API_URL = "https://www.repertoirevert.org/rest";
  API_URL_ENV = environment.url;
  //API_PROXY_URL = environment.proxyUrl + 'rest'

  constructor(private http: HttpClient) { }

  initializeCategories(): void {
    this.http.get<Category[]>(this.API_URL + '/category').subscribe(
      response => {
        this.categories = response;
        this.categoriesUpdated.next([...this.categories]);
      },
      error => {
        console.log(error);
      }
    );
  }

  getAllCategories(): Category[] {
    return [...this.categories];
  }

  getCategoriesUpdateListener() {
    // Return observable for components interested in cart changes
    return this.categoriesUpdated.asObservable();
  }

  getCategories(): Observable<any> {
    return this.http.get(this.API_URL + '/category');
  }

  getCategory(id: number): Observable<any> {
    return this.http.get(this.API_URL + '/category/' + id);
  }

  getCategoriesWithSubcategories(): Promise<Category[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Category[]>(this.API_URL_ENV + 'api/categories').subscribe( response => {
        if (response) {
          resolve(response);
        } else {
          reject();
        }
      },
      error => {
        console.log(error);
        reject();
      })
    });
  }
}
