import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import * as firebase from 'firebase';
import {ActivatedRoute,Router,ParamMap} from '@angular/router';
import {FileUpload} from './fileupload';
import {DatePipe} from '@angular/common';
import { FlashMessagesService } from 'ngx-flash-messages';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UploadFileService {
  id;
  private basePath = '/uploaded-files';
  fileUploads: FirebaseListObservable<FileUpload[]>;
  private now: Date = new Date();
  latest_year;
  latest_month;
  latest_day;
  user;
  loggedInUser = {};
  companyName;
  checkAdmin;

  constructor(private db: AngularFireDatabase,private router:Router,public datepipe:DatePipe,public dataBase:DatabaseService,private flashM: FlashMessagesService) {
    this.id = undefined;
    this.latest_year = this.datepipe.transform(this.now,'yyyy');
    this.latest_month = +this.datepipe.transform(this.now,'MM') - 1;
    this.latest_day = this.datepipe.transform(this.now,'dd');
    this.dataBase.user$.subscribe(user => {this.user = user});

  // Checking from where the information will be sent. If from admin the name is not nessary and the information will be uploaded to uploaded-files/fileName
  // if from user the name is needed and it will be uploaded to uploaded-files/userName/year/month/fileName
    this.dataBase.appUser().map(loggedInUser => loggedInUser.isAdmin).subscribe(checkAdmin => {
    if(checkAdmin == true){
      this.companyName = '';
    }
    else {
      this.dataBase.appUser().map(loggedInUser =>  loggedInUser.name).subscribe( companyName => { this.companyName = companyName })
    }});
  }
  pushFileToStorage(fileUpload: FileUpload, id) {
    const storageRef = firebase.storage().ref();
    if(this.companyName === undefined){
      //from admin
      const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {},
        (error) => {
          // fail
          console.log('Error',error)
        },
        () => {
          // success
          fileUpload.url = uploadTask.snapshot.downloadURL
          fileUpload.name = fileUpload.file.name
          this.saveFileData(fileUpload,id)
          {
            this.flashM.show('File successfully uploaded', {
              classes: ['alert', 'alert-success'],
              timeout: 2000,
            });
          }})
        }
        else {
          // from user
          const uploadTask = storageRef.child(`${this.basePath}/${this.companyName+' '+this.latest_year+' '+this.latest_month+' '+fileUpload.file.name}`).put(fileUpload.file);
          uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {},
            // in progress
            (error) => {
            // fail
            console.log('error',error)
          },
          () => {
            // success
            fileUpload.url = uploadTask.snapshot.downloadURL
            fileUpload.name = fileUpload.file.name
            this.saveFileData(fileUpload,id)
            {
              this.flashM.show('File successfully uploaded', {
                classes: ['alert', 'alert-success'],
                timeout: 2000,
              });
            }
          }
        )}
      };

      private saveFileData( fileUpload: FileUpload, id){
        if(id){
          this.db.list('/users/'+id+'/documents/'+'download-files/'+this.latest_year).push(fileUpload);
        }
        else {
          this.db.list(`/users/`+this.user.uid+`/documents/`+'uploaded-files/'+this.latest_year+'/'+this.latest_month).push(fileUpload);
        }
      }

      deleteFileUpload(fileUpload: FileUpload) {
        this.deleteFileDatabase(fileUpload.$key)
        .then(() => {
          this.deleteFileStorage(fileUpload.name)
        })
        .catch(error => console.log('Error',error))
      }

      private deleteFileDatabase(key: string) {
        return this.db.list(`${this.basePath}/`).remove(key)
      }

      private deleteFileStorage(name: string) {
        const storageRef = firebase.storage().ref()
        storageRef.child(`${this.basePath}/${name}`).delete()
      }
    }
