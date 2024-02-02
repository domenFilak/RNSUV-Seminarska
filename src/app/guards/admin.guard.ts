
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAuthService } from '../admin/service/admin-auth.service';

//dodamo to da recimo ce se izpisemo ne moremo z zavihkom nazaj na stran kjer smo bili vpisani
@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private adminService: AdminAuthService, private router: Router){

  }

  canActivate(): boolean{
    if (this.adminService.isAdminLoggedIn() == true){
      return true;
    }
    else {
      this.router.navigate(["/admin/login"]);
      return false;
    }
  }
}


