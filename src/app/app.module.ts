import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule,routingComponent } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutUsComponent } from './components/about-us-page/about-us-page.component';
import { SlideComponent } from './components/slide/slide.component';
import { ContactComponent } from './components/contact-page/contact-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ServicePageComponent } from './components/service-page/service-page.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { FilesComponent } from './components/files/files.component';
import { UserMainInformationComponent } from './components/user-main-information/user-main-information.component';
import { UserRequestsComponent } from './components/user-requests/user-requests.component';
import { AdminViewUserInformation } from './components/admin-view-user-information/admin-view-user-information.component';
import { NewUserInformationComponent } from './components/new-user-information/new-user-information.component';
import { AdminPanelNavComponent } from './components/admin-panel-nav/admin-panel-nav.component';
import { UserDownloadFileComponent } from './components/user-download-file/user-download-file.component';
import { FlashMessagesModule } from 'ngx-flash-messages';
import { RegUserComponent } from './components/reg-user/reg-user.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { MessageComponent } from './components/message/message.component';

import { DatabaseService } from './services/database/database.service';
import { AuthService } from './services/auth/auth.service';
import { UploadFileService } from './services/upload/upload-file.service';

import { CanActivateGuard } from './guards/can-activate.guard';
import { CheckRoleGuard } from './guards/check-role.guard';
import { FirstLogginGuard } from './guards/first-loggin.guard';

export const firebaseConfig = {
  apiKey: "AIzaSyCckPwG2YKUKKHkwk_A9aXMraSx-Scza7I",
   authDomain: "fsdashboard-b395c.firebaseapp.com",
   databaseURL: "https://fsdashboard-b395c.firebaseio.com",
   projectId: "fsdashboard-b395c",
   storageBucket: "fsdashboard-b395c.appspot.com",
   messagingSenderId: "352968625956"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    routingComponent,
    AboutUsComponent,
    SlideComponent,
    ContactComponent,
    FooterComponent,
    ContactFormComponent,
    ServicePageComponent,
    UploadFileComponent,
    FilesComponent,
    UserMainInformationComponent,
    UserRequestsComponent,
    AdminViewUserInformation,
    NewUserInformationComponent,
    AdminPanelNavComponent,
    UserDownloadFileComponent,
    RegUserComponent,
    MessageComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    NgbModule.forRoot(),
    FlashMessagesModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,CanActivateGuard,UploadFileService,DatePipe,CheckRoleGuard,FirstLogginGuard,DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule {

constructor(public afAuth: AngularFireAuth){}

}
