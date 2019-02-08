import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  id;
  info = [];
  constructor(private route:ActivatedRoute, public router:Router, public dataBase:DatabaseService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    }
    route.paramMap.subscribe(params => { this.id = params.get('id') });
    this.dataBase.getMessageInfo(this.id).subscribe( info=> { this.info = info })
  }

  deleteMessage(id){
    if(confirm("Do your really want to delete this message?")){
      this.dataBase.deleteMessage(id);
      this.router.navigate(['request-review'])
    }
    return false;
  }}
