import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutModule } from '../layout/layout.module';
import { CreateUserComponent } from './create-user.component';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        LayoutModule
    ],
    declarations: [
        CreateUserComponent
    ]
})
export class CreateUserModule {}