import { NgModule, Provider } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Ng2Webstorage } from 'ng2-webstorage';

import { UserService } from './user.service';
import { PartyService } from './party.service';
import { MailboxService } from './mailbox.service';
import { InventoryService } from './inventory.service';
import { SettingsService } from './settings.service';
import { InventoryConversion } from './inventory-conversion';
import { SessionService } from './session.service';
import { SessionStateService } from './session-state.service';
import { AuthenticatedHttpService } from './authenticated-http.service'; 
import { ParamSerializer } from './param-serializer';
import { Environment } from './environment';

@NgModule({
    imports: [
        HttpModule,
        RouterModule,
        Ng2Webstorage
    ],
    providers: [
        UserService,
        PartyService,
        MailboxService,
        InventoryService,
        InventoryConversion,
        SettingsService,
        SessionService,
        SessionStateService,
        AuthenticatedHttpService,
        ParamSerializer,
        Environment
    ]
})
export class ApiModule {
}