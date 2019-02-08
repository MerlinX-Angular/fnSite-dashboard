import { Component,AfterViewInit,ElementRef,ViewChild  } from '@angular/core';
import { ActivatedRoute,Router,ParamMap } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { FileUpload } from '../../services/upload/fileupload';
import { UploadFileService } from '../../services/upload/upload-file.service';
import { range, each }  from "lodash";
import { DatabaseService } from '../../services/database/database.service';
declare let $: any;

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements AfterViewInit {
  fileCount = 0;
  id;
  loads:boolean;
  selectedFiles: FileList
  currentFileUpload: FileUpload

  @ViewChild('inputFile') myInputVariable: ElementRef;
  constructor(private uploadService: UploadFileService, public authService:AuthService, private route:ActivatedRoute,public dataBase:DatabaseService) {
    route.paramMap.subscribe(params => { this.id = params.get('id') });
  }

  ngAfterViewInit() {
  window.scrollTo(0, 0);
}

selectFile(event) {
  const file = event.target.files.item(0)
  this.fileCount = event.target.files.length;
  // If user selects more then 10 files throw error
  if(event.target.files.item(10)){
  this.loads = false;
  alert('too many files (max 10)')
}
// If invalid format throw error
else {
if (file.type.match('application.*')) {
  this.selectedFiles = event.target.files;
  this.loads = true;
} else {
  alert('invalid format!');
}}
}

uploadMulti() {
  let files = this.selectedFiles
  let filesIndex = range(files.length)
  each(filesIndex, (idx) => {
    this.currentFileUpload = new FileUpload(files[idx]);
    this.uploadService.pushFileToStorage(this.currentFileUpload,this.id)}
  )
  // reset upload form
  this.myInputVariable.nativeElement.value = '';
  this.loads = false;
  this.fileCount = 0;
}
}
