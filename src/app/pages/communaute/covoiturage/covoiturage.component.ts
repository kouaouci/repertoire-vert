import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alerts/alert.service';
import { GeocodeapiService } from 'src/app/services/geocodeapi/geocodeapi.service';
import { Covoiturage } from 'src/app/shared/Communauty.model';

@Component({
  selector: 'app-covoiturage',
  templateUrl: './covoiturage.component.html',
  styleUrls: ['./covoiturage.component.scss'],
  providers: [DatePipe]
})
export class CovoiturageComponent implements OnInit {

  covoiturage: Covoiturage;

  covoiturageForm = new FormGroup({
    departure: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required)
  })

  // Suggested addresses
  departureSuggestions: any[] = [];
  showDepartureSuggestions: boolean = false;

  destinationSuggestions: any[] = [];
  showDestinationSuggestions: boolean = false;

  // Search for addresses every third keypress
  keypressNumber: number = 0;

  // Selected departure and destination address
  selectedDeparture: any;
  selectedDestination: any;

  constructor(
    private router: Router,
    private geocodeapiService: GeocodeapiService,
    private alertService: AlertService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    // Reset departure and destination
    this.covoiturageForm.controls['departure'].setValue('');
    this.covoiturageForm.controls['destination'].setValue('');
    this.selectedDeparture = undefined;
    this.selectedDestination = undefined;

    // Get date and time
    this.covoiturageForm.controls['date'].setValue(formatDate(new Date(), 'MM-dd-yyyy', 'en'));
    this.covoiturageForm.controls['time'].setValue(formatDate(new Date(), 'HH:mm', 'en'));
  }

  createOffer() {   

    if (this.covoiturageForm.valid && this.selectedDeparture !== undefined && this.selectedDestination !== undefined) {
      const departureDate: string = this.getDateTime().toISOString();  

      this.covoiturage = {
        createur: parseInt(localStorage.getItem('repVertId')),
        departure: this.covoiturageForm.controls['departure'].value,
        destination: this.covoiturageForm.controls['destination'].value,
        departuredate: departureDate,
        departureLatitude: this.selectedDeparture.geometry.coordinates[1],
        departureLongitude: this.selectedDeparture.geometry.coordinates[0],
        destinationLatitude: this.selectedDestination.geometry.coordinates[1],
        destinationLongitude: this.selectedDestination.geometry.coordinates[0]
      }

      // Navigate to covoiturage confirmation page
      this.router.navigate(['/tabs/covoiturage/new'], { queryParams: this.covoiturage });

      // Reset form
      //this.initializeForm();
    } else {
      this.alertService.presentAlert("error", "insertValidAddress");
    }
  }

  async findOffer() {

    if (this.covoiturageForm.valid && this.selectedDeparture !== undefined && this.selectedDestination !== undefined) {
      const departureDate: string = this.getDateTime().toISOString();      

      this.router.navigate(['tabs/communaute-find-result'], {
        queryParams: {
          date: departureDate.split('T')[0] + '%',
          deplat: this.selectedDeparture.geometry.coordinates[1],
          deplon: this.selectedDeparture.geometry.coordinates[0],
          deslat: this.selectedDestination.geometry.coordinates[1],
          deslon: this.selectedDestination.geometry.coordinates[0],
        }
      });
    } else {
      this.alertService.presentAlert("error", "insertValidAddress");
    }
  }

  getDateTime(): Date {
    // Construct datetime for new covoiturage, from form inputs
    const date: string = this.covoiturageForm.controls['date'].value;
    const dateStr: string = date.split('T')[0];
    const timeStr: string = this.covoiturageForm.controls['time'].value;

    return new Date(dateStr + ' ' + timeStr);
  }


  selectDeparture(address: any) {
    this.selectedDeparture = address;
    this.covoiturageForm.controls['departure'].setValue(address.properties.label);
    this.showDepartureSuggestions = false;
    this.departureSuggestions = [];
  }

  selectDestination(address: any) {
    this.selectedDestination = address;
    this.covoiturageForm.controls['destination'].setValue(address.properties.label);
    this.showDestinationSuggestions = false;
    this.destinationSuggestions = [];
  }

  unselectAddress(type: string) {
    if (type === 'departure') {
      this.selectedDeparture = undefined;
    } else {
      this.selectedDestination = undefined;
    }
  }

  getArray(type: string): any[] {
    if (type === 'departure') {
      return this.departureSuggestions;
    } else {
      return this.destinationSuggestions;
    }
  }

  updateArray(type: string, suggestions: any[]): void {
    if (type === 'departure') {
      this.departureSuggestions = suggestions
    } else {
      this.destinationSuggestions = suggestions
    }
  }

  showOrHideList(type: string, value: boolean): void {
    if (type === 'departure') {
      this.showDepartureSuggestions = value;
    } else {
      this.showDestinationSuggestions = value
    }
  }

  addressKeyPress(event, type: string) {

    // Address that will be sent to Geocode API
    let address: string = event.target.value;

    // Unselect address, user needs to select a valid address from suggestions
    this.unselectAddress(type);

    if (event.target.value.length > 10) {
      // Request for addresses every third keypress
      if (this.keypressNumber === 3) {
        // Only request addresses if no suggestions yet 
        // Or sugegestions have narrowed down to 4 or less
        if (this.getArray(type).length === 0 || this.getArray(type).length > 1)
          this.geocodeapiService.getAddressSuggestions(address).subscribe(
            response => {

              // Add suggestions to departure suggestions and show them
              this.updateArray(type, response.features);
              this.showOrHideList(type, true);

              // Reset keypress count
              this.keypressNumber = 0;
            },
            error => {
              console.log(error);
            }
          )
      } else {
        this.keypressNumber++;
      }
    } else {
      // Hide suggestion container and clear suggestions list
      this.showOrHideList(type, false);
      this.updateArray(type, []);
    }
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
