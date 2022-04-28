import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { Report } from 'src/app/shared/Report.model';
import { ReportType } from 'src/app/shared/ReportType.model';
import { environment } from 'src/environments/environment';
import { AlertService } from '../alerts/alert.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  API_URL = environment.url + 'api/';

  private reportTypes: ReportType[] = [];
  private reportTypesUpdated = new Subject<ReportType[]>();

  constructor(
    private http: HttpClient,
    private alertService: AlertService) { }


  initializeReportTypes() {
    // Get all report types
    this.http.get<{code: number, content: any}>(this.API_URL + 'reportTypes')
    .subscribe( response => {
      if (response.code === 200) {
        console.log(response.content);
        
        this.reportTypes = response.content;
        this.reportTypesUpdated.next([...this.reportTypes]);
      } else {
        this.alertService.presentAlert("error", "errorOccurred");
      }
    },
    error => {
      console.log(error);
      this.alertService.presentAlert("error", "errorOccurred");
    })
  }


  getOrders(): ReportType[] {
    // Return report types
    return [...this.reportTypes];
  }


  getOrdersUpdateListener() {
    // Return observable for components interested in report types changes
    return this.reportTypesUpdated.asObservable();
  }


  addReport(report: Report): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post<{code: number, message: string, reportId: number, reportDate: Date}>
      (this.API_URL + 'reports', report).subscribe(
        response => {
          if (response.code === 201) {
            console.log(response);
            resolve(true);
          } else {
            this.alertService.presentAlert("error", "errorOccurred");
            resolve(false);
          }
        },error => {
          this.alertService.presentAlert("error", "errorOccurred");
          console.log(error);
          reject();
        }
      )
    });
  }
}
