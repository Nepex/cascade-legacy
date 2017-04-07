import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { LayoutModule } from '../layout/layout.module';
import { CommonModule } from '../common/common.module';
import { CreateUserComponent } from './create-user.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        CommonModule,
        LayoutModule
    ],
    declarations: [
        CreateUserComponent
    ]
})
export class CreateUserModule {}