import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ReportService } from 'src/app/services/report/report.service';
import { Report } from 'src/app/shared/Report.model';
import { ReportType } from 'src/app/shared/ReportType.model';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.scss']
})
export class ReportModalComponent implements OnInit, OnDestroy {

  @Input() entity: string;
  @Input() entityId: number;
  @Input() close: Function;

  reportTypes: ReportType[] = [];
  reportTypesSub: Subscription;

  reportForm: FormGroup;

  title: string = '';
  successMessage: string = '';

  constructor(
    public alertController: AlertController,
    private reportService: ReportService,
    fb: FormBuilder) {
      this.reportForm = fb.group({
        reportType: [1, Validators.required],
        message: ['']
      });
  }

  ngOnInit() {
    // Initialize report types
    this.reportService.initializeReportTypes();

    // Subscribe to report types updates
    this.reportTypesSub = this.reportService.getOrdersUpdateListener()
      .subscribe(reportTypes => {
        this.reportTypes = reportTypes;
      });

    // Initialize title and alert message
    if (this.entity === 'post') 
    {
      this.title = 'cette discussion';
      this.successMessage = 'La discussion a bien été signalée'
    } else if (this.entity === 'comment') 
    {
      this.title = 'ce commentaire';
      this.successMessage = 'Le commentaire a bien été signalé'
    }
  }

  ngOnDestroy() {
    this.reportTypesSub.unsubscribe();
  }

  getUserId(): number {
    return parseInt(localStorage.getItem('repVertId'));
  }

  handleSubmit() {
    let report: Report = {
      creator: this.getUserId(),
      message: this.reportForm.controls['message'].value.trim(),
      entity: this.entity,
      entityId: this.entityId,
      reportType: this.reportForm.controls['reportType'].value,
    }

    this.reportService.addReport(report).then(result => {
      if (result) {
        this.presentAlert("Succès", this.successMessage);
        this.close();
      }
    });
  }

  async presentAlert(header: string, message: string) {
    // Message d'erreur
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
