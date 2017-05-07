import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from './layout/layout.module';
import { CommonModule } from './common/common.module';
import { HomeModule, HomeComponent } from './home/index';
import { ChangeLogModule, ChangeLogComponent } from './changelog/index';
import { CreateUserModule, CreateUserComponent } from './create-user/index';
import { LoginModule, LoginComponent } from './login/index';
import { PartyModule, PartyComponent } from './party/index';
import { QuestLogModule, QuestLogComponent } from './questlog/index';
import { MailboxModule, MailboxComponent } from './mailbox/index';
import { InventoryModule, InventoryComponent } from './inventory/index';

import {
  ExploreModule, ExploreComponent, ArcComponent, ArcBlueMoonInnComponent, ArcEquipmentStoreComponent, ArcGeneralStoreComponent, ArcTownSquareComponent,
  RitualGroundsComponent
} from './explore/index';

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
    BrowserAnimationsModule,
    HttpModule,
    CommonModule,
    HomeModule,
    ChangeLogModule,
    CreateUserModule,
    MailboxModule,
    LoginModule,
    PartyModule,
    ExploreModule,
    QuestLogModule,
    LayoutModule,
    InventoryModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'changelog', component: ChangeLogComponent },
      { path: 'signup', component: CreateUserComponent },
      { path: 'login', component: LoginComponent },
      { path: 'party', component: PartyComponent, canActivate: [AuthGuard] },
      { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard] },
      { path: 'questlog', component: QuestLogComponent, canActivate: [AuthGuard] },
      { path: 'mailbox', component: MailboxComponent, canActivate: [AuthGuard] },
      { path: 'explore', component: ExploreComponent, canActivate: [AuthGuard] },
      { path: 'arc', component: ArcComponent, canActivate: [AuthGuard] },
      { path: 'arc/townsquare', component: ArcTownSquareComponent, canActivate: [AuthGuard] },
      { path: 'arc/blue-moon-inn', component: ArcBlueMoonInnComponent, canActivate: [AuthGuard] },
      { path: 'arc/general-store', component: ArcGeneralStoreComponent, canActivate: [AuthGuard] },
      { path: 'arc/equipment-store', component: ArcEquipmentStoreComponent, canActivate: [AuthGuard] },
      { path: 'ritual-grounds', component: RitualGroundsComponent, canActivate: [AuthGuard] }      

    ])
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
