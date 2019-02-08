import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';
@Component({
  selector: 'app-new-user-information',
  templateUrl: './new-user-information.component.html',
  styleUrls: ['./new-user-information.component.css']
})
export class NewUserInformationComponent {
  constructor(public dataBase:DatabaseService,private router:Router) { }
  name;
  phone;
  userEmail;
  address;

  updateNew(info){
    this.dataBase.pushNewUserInformation(info);
    this.router.navigate(['/file-upload']);
  }
}
