import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';

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
        ApiModule,
        CommonModule,
        LayoutModule,
        NgxPaginationModule
    ],
    declarations: [
        InventoryComponent
    ],
    entryComponents: [
        InventoryComponent
    ]
})
export class InventoryModule { }