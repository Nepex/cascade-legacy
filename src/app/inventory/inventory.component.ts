import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService, PartyService, InventoryService } from '../api/index';
import { AlertMessages } from '../layout/alert-messages.component';

@Component({
    selector: 'app-inventory',
    templateUrl: 'inventory.html',
    styleUrls: ['inventory.css']
})
export class InventoryComponent {

    user: any = {};
    party: any = [];
    inventory: any = {};
    spellsLearned: any;
    messages: AlertMessages[] = [];
    loadingRequest: Observable<any>;
    removeRequest: Observable<any>;

    constructor(private userService: UserService, private partyService: PartyService, private inventoryService: InventoryService) {
        this.activate();
    }

    activate() {
        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser(),
            this.partyService.getParty(),
            this.inventoryService.getInventory()
        );

        this.loadingRequest.subscribe(res => {
            this.user = res[0];
            this.party = res[1];
            this.inventory = res[2];
        });
    }
}
