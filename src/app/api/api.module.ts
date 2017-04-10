import { NgModule, Provider } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Ng2Webstorage } from 'ng2-webstorage';

import { UserService } from './user.service';
import { SessionService } from './session.service';
import { SessionStateService } from './session-state.service';
import { AuthenticatedHttpService } from './authenticated-http.service'; 
import { ParamSerializer } from './param-serializer';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        Ng2Webstorage
    ],
    providers: [
        UserService,
        SessionService,
        SessionStateService,
        AuthenticatedHttpService,
        ParamSerializer
    ]
})
export class ApiModule {
}