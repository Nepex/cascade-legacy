import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BattleModule } from '../battle/battle.module';

import { ApiModule } from '../api/index';
import { LayoutModule } from '../layout/layout.module';
import { CommonModule } from '../common/common.module';
import { ExploreComponent } from './explore.component';

import { ArcComponent } from './towns/arc/arc.component';
import { ArcTownSquareComponent } from './towns/arc/townsquare.component';
import { ArcBlueMoonInnComponent } from './towns/arc/blue-moon-inn.component';
import { ArcGeneralStoreComponent } from './towns/arc/general-store.component';
import { ArcEquipmentStoreComponent } from './towns/arc/equipment-store.component';

import { RitualGroundsComponent } from './zones/ritual-grounds/ritual-grounds.component';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        JsonpModule,
        ApiModule,
        BattleModule,
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
        ArcEquipmentStoreComponent,
        RitualGroundsComponent
    ],
})
export class ExploreModule { }