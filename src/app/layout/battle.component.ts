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
    options = [];
    showOptions = false;
    selectedSpell = null;
    selectedItem = null;
    partyMemberSelected = null;

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

            for (let i = 0; i < this.inventory.length; i++) {
                this.inventory[i].itemName = this.inventory[i].name;
            }

            for (let i = 0; i < this.enemies.length; i++) {
                this.enemies[i].enemyName = this.enemies[i].name;
            }

            for (let i = 0; i < this.party.length; i++) {
                // timeout to compensate for ngfor populating to pick up element refs (not sure of a better way)
                setTimeout(() => {
                    this.party[i].partyName = this.party[i].name;
                    this.party[i].showParty = false;

                    let baseTime = 4000;

                    let minusMs = this.party[i].hst * 10;

                    this.party[i].loadTime = baseTime - minusMs;
                    this.party[i].showActions = false;
                    this.beginLoad(i, this.party[i].loadTime);
                }, 50);
            }
        });
    }

    beginLoad(i, loadTime) {
        let animationTime = loadTime / 1000;
        let barElement: ElementRef = this.progressBar.toArray()[i];

        this.ngxAni.to(barElement, animationTime, {
            width: '100%'
        });

        setTimeout(() => {
            this.party[i].showActions = true;
        }, loadTime)
    }

    flee(i) {
        this.closeOptions();
        // if some number then flee else fail

        let barElement: ElementRef = this.progressBar.toArray()[i];
        this.ngxAni.to(barElement, 0, {
            width: '0%'
        });

        setTimeout(() => {
            this.party[i].showActions = false;
            this.beginLoad(i, this.party[i].loadTime);
        }, 50);
    }

    buildOptions(obj, actionSelected, partyMemberIndex) {
        this.selectedItem = null;
        this.selectedSpell = null;

        // selects party member index for element ref (for resetting load bar)
        if (partyMemberIndex || partyMemberIndex === 0) {
            this.partyMemberSelected = partyMemberIndex;
        }

        this.options = [];

        if (actionSelected === 'ability') {
            this.options.push({
                spellName: 'Attack',
                base: 100,
                spellType: 'Physical'
            });

            for (let i = 0; i < obj.spells.length; i++) {
                this.options.push(obj.spells[i]);
            }
        }

        if (actionSelected === 'item') {
            for (let i = 0; i < this.inventory.length; i++) {
                if (this.inventory[i].usable) {
                    this.options.push(this.inventory[i]);
                }
            }
        }

        if (actionSelected === 'friendlySpell') {
            this.selectedSpell = obj;

            for (let i = 0; i < this.party.length; i++) {
                this.options.push(this.party[i]);
            }
        }

        if (actionSelected === 'hostileSpell') {
            this.selectedSpell = obj;

            for (let i = 0; i < this.enemies.length; i++) {
                this.options.push(this.enemies[i]);
            }
        }

        if (actionSelected === 'friendlyItem') {
            this.selectedItem = obj;

            for (let i = 0; i < this.party.length; i++) {
                this.options.push(this.party[i]);
            }
        }

        this.showOptions = true;
    }

    useOnParty(obj) {
        this.closeOptions();

        // call api

        // if success        
        let barElement: ElementRef = this.progressBar.toArray()[this.partyMemberSelected];
        this.ngxAni.to(barElement, 0, {
            width: '0%'
        });

        setTimeout(() => {
            this.party[this.partyMemberSelected].showActions = false;
            this.beginLoad(this.partyMemberSelected, this.party[this.partyMemberSelected].loadTime);
        }, 50);
    }

    useOnEnemy(obj) {
        this.closeOptions();

        // do math within component

        // if success
        let barElement: ElementRef = this.progressBar.toArray()[this.partyMemberSelected];
        this.ngxAni.to(barElement, 0, {
            width: '0%'
        });

        setTimeout(() => {
            this.party[this.partyMemberSelected].showActions = false;
            this.beginLoad(this.partyMemberSelected, this.party[this.partyMemberSelected].loadTime);
        }, 50);
    }

    closeOptions() {
        this.showOptions = false;
    }

}