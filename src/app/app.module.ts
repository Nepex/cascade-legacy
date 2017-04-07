import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { LayoutModule } from './layout/layout.module';
import { CommonModule } from './common/common.module';
import { HomeModule, HomeComponent } from './home/index';
import { CreateUserModule, CreateUserComponent } from './create-user/index';
import { LoginModule, LoginComponent } from './login/index';


import { AppComponent } from './app.component';

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
    CreateUserModule,
    LoginModule,
    LayoutModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'create', component: CreateUserComponent },
      { path: 'login', component: LoginComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
