import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '../common/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        CommonModule,
        NgbModule.forRoot()
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
        IconWithTooltipComponent
    ],
    exports: [
        HeaderComponent,
        HeaderMembersComponent,
        FooterComponent,
        AlertMessagesComponent,
        MainMenuNavComponent,
        SpriteLoaderComponent,
        ExpBarComponent,
        IconWithTooltipComponent
    ],
    entryComponents: [
        ConfirmModalComponent,
        SettingsComponent
    ]
})
export class LayoutModule {}