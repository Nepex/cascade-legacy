import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutModule } from '../layout/layout.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        LayoutModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class LoginModule {}