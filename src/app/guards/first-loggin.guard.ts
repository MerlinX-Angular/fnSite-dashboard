import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/map";
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database/database.service';

@Injectable()
export class FirstLogginGuard implements CanActivate {
  constructor(private dataBase:DatabaseService,public router:Router){}
  canActivate():Observable<boolean>{
    // Checking if user got userInformation subsection in database. If it doesn't exist it means the current user is a new user.
    return this.dataBase.appUser$.map(appUser => {
      if(appUser.userContacts) return true;
      this.router.navigate(['/new-user-information']);
      return false;
    })}
  }
