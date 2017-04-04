import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { LayoutModule } from './layout/layout.module';
import { HomeModule, HomeComponent } from './home/index';
import { CreateUserModule, CreateUserComponent } from './create-user/index';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HomeModule,
    CreateUserModule,
    LayoutModule,    
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'create', component: CreateUserComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
