import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { AuthData } from "src/app/models/auth-data.model";
import { User } from "src/app/shared/user.model";
import { environment } from "src/environments/environment";

import { Md5 } from "ts-md5/dist/md5";
import { CartService } from "../cart/cart.service";
import { OrdersService } from "../orders/orders.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  LOGIN_API_URL = environment.authApiUrl;
  REP_VERT_API = environment.url + "api/";

  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  // Authenticated user or company
  private connectedUser: any;

  headers = new HttpHeaders({
    "Data-Type": "json",
    "Content-Type": "application/json",
  });

  constructor(private http: HttpClient) {}

  verifyAuth(email: string, password: string): Promise<number> {
    const authData: AuthData = {
      email: email,
      password: this.encryptPassword(password),
    };

    return new Promise<number>((resolve, reject) => {
      this.http
        .post<{ id: number; message: string }>(
          this.LOGIN_API_URL + "login",
          authData,
          { headers: this.headers }
        )
        .subscribe(
          (response) => {
            // If response has an id, auth successful
            if (response.hasOwnProperty("id")) {
              resolve(response.id);
            } else {
              resolve(-1);
            }
          },
          (error) => {
            reject();
            console.log(error);
          }
        );
    });
  }

  logout(): void {
    // Remove connected user
    this.connectedUser = null;

    // Remove local storage info
    localStorage.removeItem("id");
    localStorage.removeItem("repVertId");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    this.isAuthenticated = false;

    // Notify subscribers
    this.authStatusListener.next(false);
  }

  getAuthenticatedUser() {
    return this.connectedUser;
  }

  authenticateUser(user: any): void {
    this.isAuthenticated = true;
    this.connectedUser = user;

    // Set localstorage variables
    localStorage.setItem("id", user.gaeaUserId);
    localStorage.setItem("token", user.token);
    localStorage.setItem("repVertId", user.id);
    localStorage.setItem("username", user.username);
    localStorage.setItem("firstname", user.firstname);
    localStorage.setItem("lastname", user.lastname);

    // Notify subscribers
    this.authStatusListener.next(true);

    if (user.role === "ROLE_USER") {
      // Initialize cart
      //this.cartService.initializeCart();
      // Initialize orders
      //this.ordersService.initializeOrders();
    }
  }

  loginUser(
    id: number,
    username: string,
    firstname: string,
    lastname: string,
    token: string,
    repVertId: string
  ): void {
    this.isAuthenticated = true;

    // Set logged in user info
    localStorage.setItem("id", id.toString());
    localStorage.setItem("token", token);
    localStorage.setItem("repVertId", repVertId);
    localStorage.setItem("username", username);
    localStorage.setItem("firstname", firstname);
    localStorage.setItem("lastname", lastname);

    // Notify subscribers
    this.authStatusListener.next(true);

    // Initialize cart
    //this.cartService.initializeCart();

    // Initialize orders
    //this.ordersService.initializeOrders();
  }

  register(
    username: string,
    email: string,
    password: string,
    passwordConfirm: string
  ): Observable<any> {
    const newUser = {
      username: username,
      email: email,
      password: this.encryptPassword(password),
      newpassword: this.encryptPassword(passwordConfirm),
    };
    return this.http.post<any>(this.LOGIN_API_URL + "add/gaeauser", newUser);
  }

  registerToRepVertDB(user: User): Observable<any> {
    return this.http.post<any>(this.REP_VERT_API + "persons", user);
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  setAuth(action: boolean) {
    this.isAuthenticated = action;
    this.authStatusListener.next(action);
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  async alreadyAuthenticated(): Promise<boolean> {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (id !== null && token !== null) {
      console.log("verifying");
      await this.verifyToken(parseInt(id), token).subscribe((response) => {
        if (response.code === 200) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      return false;
    }
  }

  getUser(id: number): Observable<any> {
    return this.http.get(this.REP_VERT_API + "gaeaUsers/" + id);
  }

  verifyToken(id: number, token: string): Observable<any> {
    return this.http.post<{ code: number; message: string }>(
      this.REP_VERT_API + "users/" + id + "/token",
      { token: token }
    );
  }

  encryptPassword(password: string): string {
    return Md5.hashStr(password);
  }
}
