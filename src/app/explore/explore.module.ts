import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiModule } from '../api/index';
import { LayoutModule } from '../layout/layout.module';
import { CommonModule } from '../common/common.module';
import { ExploreComponent } from './explore.component';
import { ArcComponent } from './arc/arc.component';
import { ArcTownSquareComponent } from './arc/townsquare.component';
import { ArcBlueMoonInnComponent } from './arc/blue-moon-inn.component';
import { ArcGeneralStoreComponent } from './arc/general-store.component';
import { ArcEquipmentStoreComponent } from './arc/equipment-store.component';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        JsonpModule,
        ApiModule,
        CommonModule,
        LayoutModule,
        NgxPaginationModule,
        NgbModule.forRoot()
    ],
    declarations: [
        ExploreComponent,
        ArcComponent,
        ArcTownSquareComponent,
        ArcBlueMoonInnComponent,
        ArcGeneralStoreComponent,
        ArcEquipmentStoreComponent
    ],
})
export class ExploreModule { }