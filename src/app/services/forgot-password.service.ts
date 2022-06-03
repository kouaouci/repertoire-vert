import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ForgotPasswordService {
  url: string = environment.url;
  constructor(private http: HttpClient) {}
  public preresetPassword(url: string, email: string): Observable<string> {
    console.log("email ", email);
    return this.http.post<string>(
      "https://agile-tor-83541.herokuapp.com/https://gaea21user.sustlivprogram.org/apictrl/requestpassword",
      { email, url: this.url }
    );
  }
  public sendResetPasswordMail(
    _email: any,
    token: any,
    url: string
  ): Observable<string> {
    return this.http.post<string>(
      environment.authApiUrl + "/resetpassword/{email}/{token}",
      {
        _email,
        token,
        url,
      }
    );
  }
  public sendNewPasswordMail(passeword: string): Observable<string> {
    return this.http.post<string>(
      environment.authApiUrl + "/resetpassword/{token}",
      {
        passeword,
      }
    );
  }
}
