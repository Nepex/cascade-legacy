import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'underscore';

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
    inventory: any = [];
    cachedInventory: any;
    spellsLearned: any;
    messages: AlertMessages[] = [];
    loadingRequest: Observable<any>;
    removeRequest: Observable<any>;
    searchedItem;
    currentPage = 1;
    inventoryEmpty = false;

    constructor(private userService: UserService, private partyService: PartyService, private inventoryService: InventoryService) {
        this.activate();
    }

    activate() {
        this.messages = [];

        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser(),
            this.partyService.getParty(),
            this.inventoryService.getInventory()
        );

        this.loadingRequest.subscribe(res => {
            this.user = res[0];
            this.party = res[1];
            this.inventory = res[2];
            this.cachedInventory = res[2];


            if (this.inventory.length === 0) {
                this.messages.push({
                    message: "Your inventory is empty.",
                    type: "error"
                });

                this.inventoryEmpty = true;
            }
        });
    }

    searchInventory() {
        let filteredOptions = _.filter(this.cachedInventory, obj => {
            return obj['name'].toLowerCase().indexOf(this.searchedItem) > -1;
        });

        this.inventory = filteredOptions;
        this.currentPage = 0;
    }

    equip(i) {
    }
}
