import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormValidationMsgsComponent } from './form-validation-msgs.component';

import { OffClickDirective } from './off-click.directive';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        FormValidationMsgsComponent,
        OffClickDirective
    ],
    exports: [
        FormValidationMsgsComponent,
        OffClickDirective
    ]
})
export class CommonModule {
}