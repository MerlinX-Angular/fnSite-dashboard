import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth/auth.service';
import "rxjs/add/operator/map";
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database/database.service';

@Injectable()
export class CheckRoleGuard implements CanActivate {
  constructor( private authService:AuthService, private router:Router,private dataBase:DatabaseService ){}
  canActivate():Observable<boolean> {
    return this.dataBase.appUser$.map(appUser => {
      if(appUser.isAdmin == true) return true;
      this.router.navigate(['/home']);
      return false;
    })}
  }
