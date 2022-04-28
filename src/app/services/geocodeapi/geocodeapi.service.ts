import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeocodeapiService {

  GEOCODE_API_URL = environment.geocodeApiUrl;

  constructor(private http: HttpClient) { }

  getAddressSuggestions(address: string): Observable<any> {
    return this.http.get(this.GEOCODE_API_URL + 'autocomplete?apikey=' + environment.geocodeApiKey + '&text=' + address + '&size=5');
  }
}
