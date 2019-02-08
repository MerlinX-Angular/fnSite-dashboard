import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FlashMessagesService } from 'ngx-flash-messages';
import { DatabaseService } from '../../services/database/database.service';
declare var $: any;

@Component({
  selector: 'app-failes',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements AfterViewInit  {
  document;
  constructor(public authService:AuthService,private flashM: FlashMessagesService,public dataBase:DatabaseService) { }

  getDocuments(){
    this.dataBase.showFiles().subscribe(document => { this.document = document })
  }

  delete(file){
    if(confirm("Do you really want to delete this file?")){
      this.dataBase.deleteFile(file)
    }
    return false;
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
