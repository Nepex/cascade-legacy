import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '../common/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxAniModule } from 'ngxani';

import { LayoutModule } from '../layout/layout.module';
import { BattleComponent } from './battle.component';
import { TravelComponent } from './travel.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BrowserModule,
        CommonModule,
        NgbModule.forRoot(),
        NgxAniModule,
        LayoutModule
    ],
    declarations: [
        BattleComponent,
        TravelComponent
    ],
    exports: [
        BattleComponent,
        TravelComponent
    ]
})
export class BattleModule {}