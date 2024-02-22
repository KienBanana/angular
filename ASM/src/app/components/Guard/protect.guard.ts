import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as moment  from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ProtectGuard {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate() {
    console.log('123');

    if (this.authService.isLoggedIn()) return true;
    this.router.navigate(['login']);
    return false;
  }
}

