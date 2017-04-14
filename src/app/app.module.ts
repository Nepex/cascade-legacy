import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { LayoutModule } from './layout/layout.module';
import { CommonModule } from './common/common.module';
import { HomeModule, HomeComponent } from './home/index';
import { ChangeLogModule, ChangeLogComponent } from './changelog/index';
import { CreateUserModule, CreateUserComponent } from './create-user/index';
import { LoginModule, LoginComponent } from './login/index';
import { PartyModule, PartyComponent } from './party/index';
import { AuthGuard } from './auth-guard.service';

import { AppComponent } from './app.component';

// API runs on 127.0.0.1
// NG2 runs on localhost:4200

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    HomeModule,
    ChangeLogModule,
    CreateUserModule,
    LoginModule,
    PartyModule,
    LayoutModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'changelog', component: ChangeLogComponent },
      { path: 'signup', component: CreateUserComponent },
      { path: 'login', component: LoginComponent },
      { path: 'party', component: PartyComponent, canActivate: [AuthGuard] }
    ])
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
