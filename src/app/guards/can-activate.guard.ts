import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { DatabaseService } from '../services/database/database.service';

@Injectable()
export class CanActivateGuard implements CanActivate {

  constructor(public router:Router,public dataBase:DatabaseService) {}

  // Check if user is logged in
  canActivate() {
  return this.dataBase.user$.map(user => {
    if(user) {
      return true;
    }
    else {
      this.router.navigate(['/home'])
      return false;
    }
  })}
}
