import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-reg-user',
  templateUrl: './reg-user.component.html',
  styleUrls: ['./reg-user.component.css']
})
export class RegUserComponent {

  constructor(public authService:AuthService,private router:Router,public dataBase:DatabaseService) { }
  email;

  registerNewUser(email){
    this.dataBase.regUser(email).catch(function(error){
      console.log('Error', error)
    })
    this.router.navigate(['/home'])
  }
}
