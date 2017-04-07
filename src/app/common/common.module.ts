import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormValidationMsgsComponent } from './form-validation-msgs.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        FormValidationMsgsComponent
    ],
    exports: [
        FormValidationMsgsComponent
    ]
})
export class CommonModule {
}