import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  constructor(public dataBase:DatabaseService) { }
  name = '';
  surname = '';
  phones = '';
  texts = '';
  email = '';
  check:boolean;

  sendForm(name,surname,phone,email,text){
    this.dataBase.pushFormsInformation(name,surname,phone,email,text);
    this.name = null;
  }

  enableSubmit(val){
    this.check = !val;
  }
}
