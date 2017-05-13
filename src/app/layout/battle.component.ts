import { Component, Input, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxAni, NgxCss } from 'ngxani';

import { UserService, PartyService, InventoryService } from '../api/index';

@Component({
    selector: 'cascade-battle',
    templateUrl: './battle.html',
    styleUrls: ['./battle.css']
})

export class BattleComponent {
    @ViewChildren('progressBar') progressBar;

    @Input() zone: string;
    @Input() enemies: any;
    user: any;
    party: any;
    inventory: any;


    loadingRequest: Observable<any>;

    constructor(private userService: UserService, private partyService: PartyService, private inventoryService: InventoryService,
        private ngxAni: NgxAni, private ngxCss: NgxCss, private elRef: ElementRef) {
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

            for (let i = 0; i < this.party.length; i++) {
                let baseTime = 4000;

                let minusMs = this.party[i].hst * 10;

                this.party[i].loadTime = baseTime - minusMs;

                setTimeout(() => { this.beginLoad(i) }, 50);
            }
        });
    }

    beginLoad(index) {
        let ele: ElementRef = this.progressBar.toArray()[index];

        this.ngxAni.to(ele, 4.0, {
            width: '100%'
        });
    }

}