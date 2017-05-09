import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '../common/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAniModule } from 'ngxani';

import { HeaderComponent } from './header.component';
import { HeaderMembersComponent } from './header-members.component';
import { FooterComponent } from './footer.component';
import { AlertMessagesComponent } from './alert-messages.component';
import { MainMenuNavComponent } from './main-menu-nav.component';
import { SpriteLoaderComponent } from './sprite-loader.component';
import { ExpBarComponent } from './exp-bar.component';
import { ConfirmModalComponent } from './confirm-modal.component';
import { IconWithTooltipComponent } from './icon-with-tooltip.component';
import { SettingsComponent } from './settings-modal.component';
import { DialogueSceneComponent } from './dialogue-scene.component';
import { TravelComponent } from './travel.component';
import { BattleComponent } from './battle.component';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        NgbModule.forRoot(),
        NgxAniModule
    ],
    declarations: [
        HeaderComponent,
        HeaderMembersComponent,
        FooterComponent,
        AlertMessagesComponent,
        MainMenuNavComponent,
        SpriteLoaderComponent,
        ExpBarComponent,
        ConfirmModalComponent,
        SettingsComponent,
        IconWithTooltipComponent,
        DialogueSceneComponent,
        TravelComponent,
        BattleComponent
    ],
    exports: [
        HeaderComponent,
        HeaderMembersComponent,
        FooterComponent,
        AlertMessagesComponent,
        MainMenuNavComponent,
        SpriteLoaderComponent,
        ExpBarComponent,
        IconWithTooltipComponent,
        DialogueSceneComponent,
        TravelComponent,
        BattleComponent        
    ],
    entryComponents: [
        ConfirmModalComponent,
        SettingsComponent
    ]
})
export class LayoutModule {}