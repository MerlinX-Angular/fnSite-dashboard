import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule , Routes} from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us-page/about-us-page.component';
import { ContactComponent } from './components/contact-page/contact-page.component';
import { ServicePageComponent } from './components/service-page/service-page.component';
import { FilesComponent } from './components/files/files.component';
import { UserMainInformationComponent } from './components/user-main-information/user-main-information.component';
import { UserRequestsComponent } from './components/user-requests/user-requests.component';
import { AdminViewUserInformation } from './components/admin-view-user-information/admin-view-user-information.component';
import { NewUserInformationComponent } from './components/new-user-information/new-user-information.component';
import { UserDownloadFileComponent } from './components/user-download-file/user-download-file.component';
import { RegUserComponent } from './components/reg-user/reg-user.component';
import { MessageComponent } from './components/message/message.component';

import { CheckRoleGuard } from './guards/check-role.guard';
import { FirstLogginGuard } from './guards/first-loggin.guard';
import { CanActivateGuard } from './guards/can-activate.guard';

const routes:Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'services',component:ServicePageComponent},
  {path:'about-us',component:AboutUsComponent},
  {path:'contact',component:ContactComponent},
  {path:'file-upload',component:FilesComponent,canActivate:[FirstLogginGuard,CanActivateGuard]},
  {path:'request-review',component:UserRequestsComponent,canActivate:[CheckRoleGuard]},
  {path:'admin-view/:id',component:AdminViewUserInformation,canActivate:[CheckRoleGuard]},
  {path:'new-user-information',component:NewUserInformationComponent,canActivate:[CanActivateGuard]},
  {path:'user-main-information',component:UserMainInformationComponent,canActivate:[FirstLogginGuard,CanActivateGuard] },
  {path:'file-download',component:UserDownloadFileComponent,canActivate:[FirstLogginGuard,CanActivateGuard] },
  {path:'register',component:RegUserComponent, canActivate:[CheckRoleGuard] },
  {path:'messages/:id',component:MessageComponent, canActivate:[CheckRoleGuard] },
  {path: '**', redirectTo: '/home'},
]

@NgModule({
  imports: [CommonModule,RouterModule.forRoot(routes) ],
  exports: [RouterModule,CommonModule],
  declarations: []
})
export class AppRoutingModule { }
export const routingComponent =
 [
  HomeComponent,AboutUsComponent,
  ContactComponent,FilesComponent,
  UserRequestsComponent,AdminViewUserInformation,UserDownloadFileComponent,RegUserComponent

 ]
