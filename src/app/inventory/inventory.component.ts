import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'underscore';

import { UserService, PartyService, InventoryService, MailboxService } from '../api/index';
import { AlertMessages } from '../layout/alert-messages.component';

@Component({
    selector: 'app-inventory',
    templateUrl: 'inventory.html',
    styleUrls: ['inventory.css']
})
export class InventoryComponent implements OnInit {

    user: any = {};
    party: any = [];
    mail: any = [];
    inventory: any = [];
    cachedInventory: any;
    spellsLearned: any;
    messages: AlertMessages[] = [];
    loadingRequest: Observable<any>;
    combatRequest: Observable<any>;
    searchedItem;
    currentPage = 1;
    inventoryEmpty = false;

    constructor(private userService: UserService, private partyService: PartyService, private inventoryService: InventoryService, private mailboxService: MailboxService) {
    }

    ngOnInit() {
        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser(),
            this.partyService.getParty(),
            this.inventoryService.getInventory(),
            this.mailboxService.getMessages()
        );

        this.loadingRequest.subscribe(res => {
            this.user = res[0];
            this.party = res[1];
            this.inventory = res[2];
            this.cachedInventory = res[2];
            this.mail = res[3];

            if (this.user.combat === "true") {
                this.combatRequest = this.userService.setOutCombat();

                this.combatRequest.subscribe(res => {
                    this.combatRequest = null;
                });
            }

            for (let i = 0; i < this.inventory.length; i++) {
                this.inventory[i].showParty = false;
            }

            if (this.inventory.length === 0) {
                this.messages.push({
                    message: "Your inventory is empty",
                    type: "error"
                });

                this.inventoryEmpty = true;
                this.loadingRequest = null;
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

    equip(p, i) {
        let item = i;
        let itemIdToRemove: string;

        // map party member's currently equipped item to a variable
        switch (item.slot) {
            case 'mainHand':
                itemIdToRemove = p.mainHand;
                break;
            case 'offHand':
                itemIdToRemove = p.offHand;
                break;
            case 'helm':
                itemIdToRemove = p.helm;
                break;
            case 'chest':
                itemIdToRemove = p.chest;
                break;
        }

        item.partyId = p.id;
        item.itemToRemove = this.inventoryService.getItem(itemIdToRemove, 1);

        this.loadingRequest = this.inventoryService.equip(item);
        this.loadingRequest.subscribe(
            res => {
                this.messages = [];
                this.loadingRequest = null;

                if (res._body === 'invalid job') {
                    this.messages.push({
                        message: `${p.job}s cannot use that`,
                        type: 'error'
                    });
                    return;
                }

                this.messages.push({ message: `${item.name} equipped`, type: 'success' });
                this.ngOnInit();
            });
    }

    useItem(p, i) {
        let item = i;
        item.partyId = p.id;

        this.loadingRequest = this.inventoryService.use(item);
        this.loadingRequest.subscribe(
            res => {
                this.messages = [];
                this.loadingRequest = null;

                this.messages.push({ message: `${item.name} has been used`, type: 'success' });
                this.ngOnInit();
            });
    }

    closeMenu(item) {
        for (let i = 0; i < this.inventory.length; i++) {
            if (item.id === this.inventory[i].id) {
                this.inventory[i].showParty = false;
            }
        }
    }
}
