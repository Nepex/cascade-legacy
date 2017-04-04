import { NgModule } from '@angular/core';

import { LayoutModule } from '../layout/layout.module';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        LayoutModule
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule {}