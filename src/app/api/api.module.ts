import { NgModule, Provider } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { UserService } from './user.service';
import { ParamSerializer } from './param-serializer';

@NgModule({
    imports: [
        HttpModule,
        RouterModule
    ],
    providers: [
        UserService,
        ParamSerializer
    ]
})
export class ApiModule {
}