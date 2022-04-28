import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(
    private datepipe: DatePipe
  ) { }

  getDateFromPhpFormat(phpDate): Date {
    // Get date string
    let dateStr = phpDate.date;

    // Convert date string to date
    dateStr = dateStr.substring(0, dateStr.indexOf('.'));

    // Return new date
    return new Date(dateStr);
  }

  getDate(date: Date) {
    return this.datepipe.transform(date, 'dd/MM/yyyy');
  }

  getTime(date: Date) {
    return this.datepipe.transform(date, 'HH:mm');
  }
}
