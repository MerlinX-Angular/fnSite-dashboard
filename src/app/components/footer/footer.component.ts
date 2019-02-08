import { Component,AfterViewInit  } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {
  user = {
    email: 'test@test.com',
    password: 'test123'
  };

  constructor(public authService:AuthService,public router:Router,public dataBase:DatabaseService) { }

  signInWithEmail() {
    this.authService.signInRegular(this.user.email, this.user.password)
    .then((res) => {
      this.router.navigate(['request-review']);
    })
    .catch((err) => console.log('Error' + err));
  }
  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }
}
