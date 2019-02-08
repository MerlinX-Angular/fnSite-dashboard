import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';
import {UploadFileService} from '../../services/upload/upload-file.service';
import {filter} from "lodash";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FlashMessagesService } from 'ngx-flash-messages';
import { DatabaseService } from '../../services/database/database.service';
declare var $: any;

@Component({
  selector: 'app-admin-panel-nav',
  templateUrl: './admin-panel-nav.component.html',
  styleUrls: ['./admin-panel-nav.component.css']
})
export class AdminPanelNavComponent implements OnInit {

  notification = [];
  userInfo;
  availableMonth;
  currentYear;
  message = [];
  
  constructor(public authService:AuthService, private router: Router,private upload: UploadFileService,private modalService: NgbModal,private flashM: FlashMessagesService, public dataBase:DatabaseService) {
    this.dataBase.getUserInfo().subscribe(userInfo => {this.userInfo = filter(userInfo,'userContacts')})
    this.currentYear = this.dataBase.latest_year;
  }

  ngOnInit(){
    this.dataBase.getNotifications().subscribe(notification => {this.notification = notification});
    this.dataBase.getMessages().subscribe(message => {this.message = message});
  }

  availableM(){
    this.dataBase.getStats().subscribe( res => {
      this.availableMonth = res.map(res => res.$key)});
    }

    sendNot(info){
      this.dataBase.sendRequest('I would like to get'+' '+info+' '+'summary');
      this.flashM.show('Request sent', {
        classes: ['alert', 'alert-success'],
        timeout: 2000,
      });
    }

    navToMessage(message){
      this.router.navigate(['/messages', message])
    }

    check(info){
      this.router.navigate(['/admin-view/', info.id])
    }

    user(uid){
      this.router.navigate(['/admin-view', uid]);
    }

    //NgbModal popUp
  open(content) {
    this.modalService.open(content)
  }
  open1(content1) {
    this.modalService.open(content1)
  }
  open2(content2) {
    this.modalService.open(content2)
  }
}
