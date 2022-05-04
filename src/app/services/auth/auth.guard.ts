import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
      const id = localStorage.getItem('id');
      const token = localStorage.getItem('token');

      if (id !== null && token !== null) {

        return new Promise((resolve, reject) => {
          this.authService.verifyToken(parseInt(id), token).subscribe( response => {
            
            if (response.code === 200) {
              resolve(true);
            } else {
              this.router.navigate(['/login']);
              resolve(false);
            }
          })
        })
        
      } else {
        this.router.navigate(['/login']);
        return false;
      }      
  }
}