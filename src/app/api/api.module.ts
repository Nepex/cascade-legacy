import { NgModule, Provider } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { ParamSerializer } from './param-serializer';

@NgModule({
    imports: [
        HttpModule,
        RouterModule
    ],
    providers: [
        ParamSerializer,
    ]
})
export class ApiModule {
}