import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'underscore';

import { UserService, InventoryService } from '../../../api/index';

@Component({
    selector: 'app-arc-equipment-store',
    templateUrl: 'equipment-store.html',
    styleUrls: ['../towns.css']
})
export class ArcEquipmentStoreComponent implements OnInit {

    portrait;
    speakerName;
    dialogue;
    backdrop;
    continueAllowed;
    backAllowed;
    zoneTitle;
    decisionAllowed
    leaveAllowed;
    selectedTab = 'BUY';
    showShop = false;
    itemsForSell = [];

    user: any = {};
    inventory: any = [];
    loadingRequest: Observable<any>;

    constructor(private userService: UserService, private router: Router, private inventoryService: InventoryService) {
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

        this.continueAllowed = true;
        this.backAllowed = true;
        this.zoneTitle = 'Arc (Equipment Store)';
        this.backdrop = 'arc-equipment-store.jpg';
        this.speakerName = 'Tosin';
        this.portrait = 'arc-tosin.png';
        this.dialogue = 'Welcome to my armory. Would you like to do business?';
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
            this.continueAllowed = true;
            this.backAllowed = true;
            this.zoneTitle = 'Arc (Equipment Store)';
            this.backdrop = 'arc-equipment-store.jpg';
            this.speakerName = 'Tosin';
            this.portrait = 'arc-tosin.png';
            this.dialogue = 'Welcome to my armory. Would you like to do business?';
        } else if (e === 1) {
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
    }
}
