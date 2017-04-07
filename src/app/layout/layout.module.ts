import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'

import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { AlertMessagesComponent } from './alert-messages.component';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        AlertMessagesComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        AlertMessagesComponent
    ]
})
export class LayoutModule {}