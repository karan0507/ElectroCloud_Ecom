import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    if(localStorage.getItem('token') === null){
      this.router.navigateByUrl('/account/login');
      return false;
    }
    
    return true;
  }
  
}
