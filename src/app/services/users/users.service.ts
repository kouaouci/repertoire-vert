import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URL = environment.url + 'api/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    //const headers= new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem('token'));
    return this.http.get<User[]>(this.API_URL + "persons"/*,{headers: headers}*/);
  };

  getUser(id: number): Observable<{user: User, reviews: {average: string, total: number}}> {
    return this.http.get<{user: User, reviews: {average: string, total: number}}>
    (this.API_URL + "persons/" + id);
  }
}
