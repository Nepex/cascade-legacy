import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header.component';
import { HeaderMembersComponent } from './header-members.component';
import { FooterComponent } from './footer.component';
import { AlertMessagesComponent } from './alert-messages.component';
import { MainMenuNavComponent } from './main-menu-nav.component';
import { SpriteLoaderComponent } from './sprite-loader.component';
import { ExpBarComponent } from './exp-bar.component';
import { ConfirmModalComponent } from './confirm-modal.component';

@NgModule({
    imports: [
        BrowserModule,
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
        ConfirmModalComponent
    ],
    exports: [
        HeaderComponent,
        HeaderMembersComponent,
        FooterComponent,
        AlertMessagesComponent,
        MainMenuNavComponent,
        SpriteLoaderComponent,
        ExpBarComponent
    ],
    entryComponents: [
        ConfirmModalComponent
    ]
})
export class LayoutModule {}