import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { CompanyService } from 'src/app/services/company/company.service';
import { Company } from 'src/app/shared/Company.model';

@Component({
  selector: 'app-information-edit',
  templateUrl: './information-edit.component.html',
  styleUrls: ['./information-edit.component.scss']
})
export class InformationEditComponent {

  @Output() updateEvent = new EventEmitter<Company>();
  @Output() cancelEvent = new EventEmitter();

  @Input() company: Company;

  companyForm = new FormGroup ({
    username: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    vision: new FormControl(''),
    influencezone: new FormControl(''),
    phone: new FormControl(''),
    urlwebsite: new FormControl(''),
    urlfacebook: new FormControl(''),
    urltwitter: new FormControl(''),
    urllinkedin: new FormControl(''),
  });

  constructor(
    private companyService: CompanyService,
    private alertService: AlertService) { }

  cancelEdit() {
    this.cancelEvent.emit();
  }

  resetForm() {
    Object.keys(this.companyForm.controls).forEach(key => {
      this.companyForm.get(key).setValue('');
    });
  }

  updateInfo() {

    // Create object with updates
    let updates = new Object();

    Object.keys(this.companyForm.controls).forEach(key => {
      let value = this.companyForm.get(key).value;
      if (value.trim() !== '') {
        // Add update to object
        updates[key] = value.trim();
      }
    });

    // Update DB
    this.companyService.updateCompany(this.company.id, updates).then(result => {
      if (result) {
        // Update successful
        let updatedCompany = {...this.company, ...updates}

        // Reset form
        this.resetForm();

        // Show alert
        this.alertService.presentAlert("success", "infoUpdated");

        // Notify parent
        this.updateEvent.emit(updatedCompany);
        
      } else {
        this.alertService.presentAlert("error", "errorOccurred");
      }
    });
  }
}
