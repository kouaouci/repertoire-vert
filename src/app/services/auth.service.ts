import { RepVertApiService } from 'src/app/services/rep-vert-api/RepVertApiService';
import { Injectable, NgZone } from '@angular/core';
import { map, tap} from 'rxjs/operators'; 
import { catchError } from 'rxjs/operators';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { environment } from 'src/environments/environment';

import { User } from '../shared/user.model';
import { Router } from '@angular/router';
const TOKEN_KEY = 'token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Permet de savoir si on est connecté
  private isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  
  //isLoggedin = false;
  
  user: User = {
    firstname: '',
    lastname: '',
    email: '',
    //password: '',
  };

  //headers = new HttpHeaders();
  //headers.append('content-type', 'application/x-www-form-urlencoded');
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  //headers = new HttpHeaders().set('Content-Type', "application/json")
  headersprofile = new HttpHeaders().set('Authorization','Bearer '+ localStorage.getItem('token'));
  public token: string;
  
  //loginCheckUri: string = 'https://www.repertoirevert.org/api/login_check';
  loginCheckUri: string = 'https://www.repertoirevert.org/api/login';
  registerUri: string = 'https://www.repertoirevert.org/register';
  apiUrl: string = 'https://www.repertoirevert.org'; 
  base_url_local_api:string;

  public auth: boolean;
  jwt:string;
  username:string;
  roles: Array<string>;
  
  constructor(
    private http: HttpClient, 
    private toastCtrl: ToastController,
    private router: Router,
    private repVertService:RepVertApiService, 
    private zone: NgZone, 
    public storage:Storage, 
    public toastController:ToastController) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
      //this.isLoggedin=false;
      this.base_url_local_api = "https://www.repertoirevert.org/api/";	
  }

  /*async*/ login(username:string,password:string): Observable<boolean> { 
    /*let body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);*/

    const user = {
      username: username,
      password: password
    }

    // Insertion d'un token test pour l'instant
    const token = 'token-test';
    this.token = token;
    localStorage.setItem('token', token );

    // Avertir les composants qu'on est connecté
    this.isLoginSubject.next(true);
    
    return this.isLoginSubject;

    /*return new Promise((resolve, reject) => {
      
      this.http.post(this.loginCheckUri, user, { headers: this.headers })
        .subscribe((res: any) => {

          console.log(res.text());
          
          resolve(res);
          const token = res && res.token;
          if (token) {
            this.token = token;
            localStorage.setItem('token', token );
            
            this.isLoginSubject.next(true);

          //  localStorage.setItem('id', this.user.id );
            this.isLoggedin=true;
            localStorage.setItem('isLoggedin', this.isLoggedin.toString() );
            this.Connected()
            //this.SwitchToLoggedIn();
          } 
          else {
            this.presentToast('Session has been Expired!');
          }
        }, (err) => {
          reject(err);
          console.log(err);   
        }
      );
    });*/
  }

  register(user) {
   user = new URLSearchParams();
    return new Promise((resolve, reject) => {
    
    
      this.http
        .post(this.registerUri, user.toString(), { headers: this.headers })
        .subscribe((res:any) => {
          resolve(res);
          console.log(res)
        }, err =>{
          reject(err);
        }
      )
    });
  }

  logout() {
  //  this.SwitchToLoggedOff();
    localStorage.clear();
    this.isLoginSubject.next(false);
    this.token = null;
    //this.isLoggedin=false;
    this.disonnected()
    localStorage.setItem('isLoggedin', this.isLoggedIn.toString() );
    this.router.navigate(['/'])
    // return new Promise((resolve, reject) => {
    //   let headers = new Headers();
    //   headers.append('X-Auth-Token', this.token);
    //   this.http.post(this.apiUrl + '/api/logout', {}, { headers: headers })
    //     .subscribe(res => {
    //       localStorage.clear();
    //       this.token = null;
    //     }, (err) => {
    //       reject(err);
    //     });
    // });
  }
 
  async presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    (await toast).present();
  }

  checkAuthentication(){
    return new Promise((resolve, reject) => {
      localStorage.get('token').then((value) => {
        this.token = value;
        resolve(this.token)
      }) 
    });        
  }

  profile()
  {
    return this.http.get(`${this.apiUrl}/api/getcurrent`,{ headers: this.headersprofile });
  }

  // Si un token exist, l'utilisateur est connecté
  private hasToken() : boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
 
  // Toasts
  async Connected() {
    const toast = await this.toastController.create({
      message: 'Connexion réussie',
      duration: 2000
    });
    toast.present();
  }
  async disonnected() {
    const toast = await this.toastController.create({
      message: 'Déconnexion réussie',
      duration: 2000
    });
    toast.present();
  }
}