import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'

import { HeaderComponent } from './header.component';
import { HeaderMembersComponent } from './header-members.component';
import { FooterComponent } from './footer.component';
import { AlertMessagesComponent } from './alert-messages.component';
import { MainMenuNavComponent } from './main-menu-nav.component';
import { SpriteLoaderComponent } from './sprite-loader.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        HeaderComponent,
        HeaderMembersComponent,
        FooterComponent,
        AlertMessagesComponent,
        MainMenuNavComponent,
        SpriteLoaderComponent
    ],
    exports: [
        HeaderComponent,
        HeaderMembersComponent,
        FooterComponent,
        AlertMessagesComponent,
        MainMenuNavComponent,
        SpriteLoaderComponent
    ]
})
export class LayoutModule {}