import { Component, AfterViewInit  } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { UploadFileService } from '../../services/upload/upload-file.service';
import { filter } from "lodash";
import { AdminPanelNavComponent } from '../admin-panel-nav/admin-panel-nav.component';;
import { FlashMessagesService } from 'ngx-flash-messages';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-admin-view-user-information',
  templateUrl: './admin-view-user-information.component.html',
  styleUrls: ['./admin-view-user-information.component.css']
})
export class AdminViewUserInformation implements AfterViewInit {
  id;
  compInfo;
  timeM;
  timeY;
  monthDocs;
  income;
  expenses;

  constructor(private route:ActivatedRoute,public dataBase:DatabaseService,private upload: UploadFileService,private router: Router,private flashM: FlashMessagesService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    route.paramMap.subscribe(params => {this.id = params.get('id')});
    this.timeM = +this.upload.latest_month;
    this.timeY = this.upload.latest_year;
    if(this.timeM == 13){
      this.timeM = 1;
    }
    this.dataBase.getUsersCurrentMonthDocs(this.id,this.timeM).subscribe( monthDocs => { this.monthDocs = monthDocs })
    this.dataBase.get(this.id).subscribe(compInfo => { this.compInfo = compInfo })
  }

  updateNew(income,expenses){
    this.dataBase.pushMonthInfo(income,expenses,this.id);
    this.flashM.show('Information successfully written', {
      classes: ['alert', 'alert-success'],
      timeout: 2000,
    });
  }
  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
