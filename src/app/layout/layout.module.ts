import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'

import { HeaderComponent } from './header.component';
import { HeaderMembersComponent } from './header-members.component';
import { FooterComponent } from './footer.component';
import { AlertMessagesComponent } from './alert-messages.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        HeaderComponent,
        HeaderMembersComponent,
        FooterComponent,
        AlertMessagesComponent
    ],
    exports: [
        HeaderComponent,
        HeaderMembersComponent,
        FooterComponent,
        AlertMessagesComponent
    ]
})
export class LayoutModule {}