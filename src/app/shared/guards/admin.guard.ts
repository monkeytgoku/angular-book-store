import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.authUser.pipe(
        take(1),
        switchMap(authUser =>  this.authService.getUserRoles(authUser.id)),
        map(roles => {
          const isAdmin = !!roles.admin;
          if (isAdmin) {
            return true;
          }
          this.router.navigate(['store']);
          return false;
        })
      );
  }
}
