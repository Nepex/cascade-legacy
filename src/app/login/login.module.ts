import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '../common/common.module';
import { LayoutModule } from '../layout/layout.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        LayoutModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {}