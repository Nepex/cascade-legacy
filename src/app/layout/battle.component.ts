import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService, PartyService, InventoryService } from '../api/index';

@Component({
    selector: 'cascade-battle',
    templateUrl: './battle.html',
    styleUrls: ['./battle.css']
})

export class BattleComponent {
    @Input() zone: string;
    @Input() enemies: any;
    user: any;
    party: any;
    inventory: any;


    loadingRequest: Observable<any>;

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