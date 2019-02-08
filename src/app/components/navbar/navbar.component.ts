import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database';
import { AuthService } from '../../services/auth/auth.service';
declare var $: any;
import { RouterModule } from '@angular/router';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public authService:AuthService, public af: AngularFireDatabase, public dataBase:DatabaseService) {}

  ngOnInit() {
    // navbar shrink movement
    $(document).ready(function() {
      $(window).scroll(function() {
        if($(document).scrollTop() > 10) {
          $('#nav').addClass('shrink');
        }
        else {
          $('#nav').removeClass('shrink');
        }
      });
    })
  }

}
