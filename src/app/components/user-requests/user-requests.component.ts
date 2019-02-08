import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { filter } from "lodash";
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.css']
})
export class UserRequestsComponent {
  notification;
  requests;

  constructor(public authService:AuthService, private router: Router,public dataBase:DatabaseService) {
    this.dataBase.getNotifications().subscribe( notification => { this.notification = notification });
    this.dataBase.appUser().subscribe( requests => { this.requests = requests.userContacts });
  }

  user(uid){
    this.router.navigate(['/admin-view', uid]);
  }
}
