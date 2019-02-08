import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import {DatePipe} from '@angular/common';
import * as _ from "lodash";
import 'rxjs/add/operator/switchMap';

@Injectable()
export class DatabaseService {
  latest_year;
  latest_month;
  latest_day;
  user$;
  userUid;
  randomNumber;
  kkey;
  user;
  public now: Date = new Date();

  constructor(public afAuth: AngularFireAuth, public router:Router, public af: AngularFireDatabase, public datepipe:DatePipe) {

    this.user$ = afAuth.authState;
    this.user$.subscribe( us => {
      if(us){
        this.userUid = us.uid;
        return this.save(us);}
        return [];
      });

      this.latest_year = this.datepipe.transform(this.now,'yyyy')
      this.latest_month = +this.datepipe.transform(this.now,'MM') -1;
      this.latest_day = this.datepipe.transform(this.now,'dd')

    }

    // Getting information

    getUserInfo(){
      return this.af.list('users');
    }

    getMessages(){
      return this.af.list('message');
    }

    getNotifications(){
      return this.af.list('notification');
    }

    get(uid:string){
      return this.af.object('/users/'+ uid);
    }

    getMessageInfo(id){
      return this.af.object('/message/'+ id);
    }

    appUser(){
      return this.user$.switchMap(ur => {if(ur) return this.get(ur.uid); return []});
    }

    getUsersCurrentMonthDocs(id,men){
      return this.af.list('users/'+id+'/documents/uploaded-files/'+this.latest_year+'/'+men);
    }

    showFiles(){
      return this.af.list('users/'+this.userUid+'/documents/uploaded-files/'+this.latest_year+'/'+this.latest_month);
    }

    getStats(){
      return this.af.list('/users/'+this.userUid+'/stats/'+this.latest_year);
    }

    getUploadedFiles(){
      return this.af.list('users/'+this.userUid+'/documents/download-files/'+this.latest_year);
    }

    get appUser$(){
      return this.user$.switchMap(ur => {if(ur) return this.get(ur.uid); return []});
    }

    // Updating or pushing information

    save(user){
      this.af.object('users/'+user.uid).update({
        id: user.uid,
        email:user.email
      });
    }

    pushNewUserInformation(userContacts){
      this.af.object('/users/'+this.userUid).update({
        userContacts
      });
    }

    pushMonthInfo(income,expenses,id){
      this.af.object('/users/'+id+'/stats/'+this.latest_year+'/'+this.latest_month).update({
        income,expenses
      });
    }

    pushFormsInformation(name,surname,phone,email,text){
      this.af.list('message').push([name,surname,phone,email,text]);
    }

    sendRequest(info){
      this.af.list('notification').push([this.userUid,info]);
    }

    // Delete information

    deleteMessage(id){
      this.af.list('message/').remove(id);
    }

    deleteFile(file){
      this.af.list('users/'+this.userUid+'/documents/uploaded-files/'+this.latest_year+'/'+this.latest_month).remove(file);
    }

    // getting uploaders key
    getUpKey(key){
      this.kkey = key;
    }

    //upload requested document
    uploadRD(){
      if(this.kkey == undefined){return false}
      else { this.af.list('notification').remove(this.kkey) }
    }

    // New client registration
    regUser(email){
      this.randomNumber = Math.random().toString().slice(2,18);
      return this.afAuth.auth.createUserWithEmailAndPassword(email,this.randomNumber).then(() => this.afAuth.auth.sendPasswordResetEmail(email));
    }}
