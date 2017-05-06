import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormValidationMsgsComponent } from './form-validation-msgs.component';

import { OffClickDirective } from './off-click.directive';

import { SafeHtmlPipe } from './safe-html.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        FormValidationMsgsComponent,
        OffClickDirective,
        SafeHtmlPipe        
    ],
    exports: [
        FormValidationMsgsComponent,
        OffClickDirective,
        SafeHtmlPipe
    ],
    providers: [
        SafeHtmlPipe
    ]
})
export class CommonModule {
}