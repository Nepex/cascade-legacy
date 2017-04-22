import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiModule } from '../api/index';
import { LayoutModule } from '../layout/layout.module';
import { CommonModule } from '../common/common.module';
import { InventoryComponent } from './inventory.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpModule,
        JsonpModule,
        NgbModule.forRoot(),
        ApiModule,
        CommonModule,
        LayoutModule
    ],
    declarations: [
        InventoryComponent
    ],
    entryComponents: [
        InventoryComponent
    ]
})
export class InventoryModule { }