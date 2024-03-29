import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiModule } from '../api/index';
import { LayoutModule } from '../layout/layout.module';
import { CommonModule } from '../common/common.module';
import { MailboxComponent } from './mailbox.component';
import { SendMessageComponent } from './send-message.component';
import { ReadMessageComponent } from './read-message.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpModule,
        JsonpModule,
        ApiModule,
        CommonModule,
        LayoutModule,
        NgxPaginationModule,
        NgbModule.forRoot()
    ],
    declarations: [
        MailboxComponent,
        SendMessageComponent,
        ReadMessageComponent
    ],
    entryComponents: [
        MailboxComponent,
        SendMessageComponent,
        ReadMessageComponent
    ]
})
export class MailboxModule { }