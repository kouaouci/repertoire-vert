import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  defaultImage = '../../../assets/imgs/no_product.jpg';

  constructor() { }

  normalizeString(str: string) {
    // Capitalize all characters
    let result = str.toUpperCase();

    // Ignore special characters like é, à, ...
    result = result.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Remove hyphens (-), if any
    result = result.replace(/-/g, " ");

    return result;
  }

  getDaysInMonth() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();

    let date = new Date(year, month, 1);

    let days = [];
    while (date.getMonth() === month) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  getDaysInAMonth(month: number, year: number) {
    return new Date(year, month, 0).getDate();
  }

  getServerImage(filename: string) {
    if (filename !== '') {
      return "https://repertoirevert.org/uploads/products/" + filename;
      //this.image = this.product.image;
    } else {
      return this.defaultImage;
    }
  }
}
