import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : boolean | Observable<boolean> | Promise<boolean> {
    
      const id = localStorage.getItem('id');
      const token = localStorage.getItem('token');

      if (id !== null && token !== null) {
        this.authService.verifyToken(parseInt(id), token).subscribe(response => {

          if (response.code === 200) {
            this.router.navigate(['/']);
          } else {
            return true;
          }
        })
      } else {
        return true;
      }
  }

}