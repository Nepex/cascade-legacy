import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'underscore';

import { UserService, InventoryService } from '../../../api/index';

@Component({
    selector: 'app-arc-general-store',
    templateUrl: 'general-store.html',
    styleUrls: ['../towns.css']
})
export class ArcGeneralStoreComponent implements OnInit {

    shopWindow = 'hidden';

    portrait;
    speakerName;
    dialogue;
    backdrop;
    continueAllowed;
    backAllowed;
    zoneTitle;
    decisionAllowed;
    leaveAllowed;
    selectedTab = 'BUY';
    showShop = false;
    itemsForSell = [];

    currentPage = 1;
    user: any = {};
    inventory: any = [];
    loadingRequest: Observable<any>;

    constructor(private userService: UserService, private router: Router, private inventoryService: InventoryService) {
        this.populateSellItems();
    }

    ngOnInit() {
        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser(),
            this.inventoryService.getInventory()
        );

        this.loadingRequest.subscribe(res => {
            this.user = res[0];
            this.inventory = res[1];
        });

        this.backAllowed = true;
        this.continueAllowed = true;
        this.zoneTitle = 'Arc (General Store)';
        this.backdrop = 'arc-general-store.jpg';
        this.speakerName = 'Lucca';
        this.portrait = 'arc-lucca.png';
        this.dialogue = 'We sell potions and other curatives. Would you like to look?';
    }

    refresh() {
        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser(),
            this.inventoryService.getInventory()
        );

        this.loadingRequest.subscribe(res => {
            this.user = res[0];
            this.inventory = res[1];
        });
    }

    progressDialogue(e) {
        if (e < 0) {
            this.router.navigateByUrl('/arc');
        } else if (e === 0) {
            // ask if user wants to shop
            this.backAllowed = true;
            this.continueAllowed = true;
            this.zoneTitle = 'Arc (General Store)';
            this.backdrop = 'arc-general-store.jpg';
            this.speakerName = 'Lucca';
            this.portrait = 'arc-lucca.png';
            this.dialogue = 'We sell potions and other curatives. Would you like to look?';
        } else if (e === 1) {
            // decision
            this.continueAllowed = false;
            this.backAllowed = false;
            this.decisionAllowed = true;
            this.speakerName = null;
            this.portrait = null;
            this.dialogue = null;
        } if (e === 2) {
            // if yes, open shop window
            this.decisionAllowed = false;
            this.leaveAllowed = true;
            this.showShop = true;
        } if (e === 3) {
            this.router.navigateByUrl('/arc');
        }
    }

    buyItem(item) {
        this.loadingRequest = this.inventoryService.buy(item);
        this.loadingRequest.subscribe(
            res => {
                this.loadingRequest = null;

                if (res['_body'] === 'insufficient funds') {
                    this.dialogue = 'Insufficient funds.';
                    return;
                }

                this.dialogue = `${item.name} has been purchased for <i class="fa fa-diamond"></i>${item.buyValue}.`;
                this.refresh();
            });
    }

    sellItem(item) {
        this.loadingRequest = this.inventoryService.sell(item);
        this.loadingRequest.subscribe(
            res => {
                this.loadingRequest = null;

                this.dialogue = `${item.name} has been sold for <i class="fa fa-diamond"></i>${item.sellValue}.`;
                this.refresh();
            });
    }

    populateSellItems() {
        this.itemsForSell.push(this.inventoryService.getItem('potion', 1));
    }
}
