import { Component, OnInit,AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-user-download-file',
  templateUrl: './user-download-file.component.html',
  styleUrls: ['./user-download-file.component.css']
})
export class UserDownloadFileComponent implements OnInit,AfterViewInit  {
  userDocument;

  constructor(public dataBase:DatabaseService) {}

  ngOnInit() {
    this.userDocument = this.dataBase.getUploadedFiles()
  }

  getInfo(){
    this.userDocument = this.dataBase.getUploadedFiles()
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
