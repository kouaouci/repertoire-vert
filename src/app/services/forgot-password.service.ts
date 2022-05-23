import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class ForgotPasswordService {
  constructor(private http: HttpClient) {}

  public preresetPassword(formData: FormData): Observable<string> {
    return this.http.post<string>(
      "https://agile-tor-83541.herokuapp.com/https://gaea21user.sustlivprogram.org/apictrl/" +
        "/user/reset-password",

      formData
    );
  }
  public sendResetPasswordMail(_email: any, token: any): Observable<string> {
    return this.http.post<string>(
      environment.authApiUrl + "user/reset-password/{email}/{token}",
      {
        _email,
        token,
      }
    );
  }
  public sendNewPasswordMail(passeword: string): Observable<string> {
    return this.http.post<string>(environment.authApiUrl + "resetpassword", {
      passeword,
    });
  }
}
