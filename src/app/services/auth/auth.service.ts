import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {DatePipe} from '@angular/common';
import * as _ from "lodash";
import 'rxjs/add/operator/switchMap';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AuthService {
  checkAdmin;

  constructor( public afAuth: AngularFireAuth, public router:Router, public af: AngularFireDatabase, public datepipe:DatePipe, public dataBase:DatabaseService ){

    this.checkAdmin = this.dataBase.appUser().map(appUser => {
      if(appUser.isAdmin == true) return true;
      else return false;
    })
  }

  signInRegular(email, password) {
    firebase.database().goOnline();
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    firebase.database().goOffline();
    firebase.auth().signOut();
    this.router.navigate(['/home']);
  }
}
