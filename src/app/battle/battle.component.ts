import { Component, Input, Output, ViewChildren, ElementRef, AfterViewInit, EventEmitter } from '@angular/core';
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
    @Output() combatState = new EventEmitter<any>();

    user: any;
    party: any;
    inventory: any;
    message: string;

    options = [];
    showOptions = false;
    selectedSpell = null;
    selectedItem = null;
    partyMemberSelected = null;
    enemySelected = null;
    randomAddedDmgorHealing = Math.floor(Math.random() * 10 + 1);

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
                this.enemies[i].index = i;
            }

            for (let i = 0; i < this.party.length; i++) {
                // timeout to compensate for ngfor populating to pick up element refs (not sure of a better way)
                setTimeout(() => {
                    this.party[i].addedPhysDmg = this.party[i].str * 3;
                    this.party[i].addedMagDmgOrHealing = this.party[i].mag * 3;

                    this.party[i].partyName = this.party[i].name;

                    let baseTime = 4000;

                    let minusMs = this.party[i].hst * 10;

                    this.party[i].loadTime = baseTime - minusMs;
                    this.party[i].showActions = false;
                    this.beginLoad(i, this.party[i].loadTime);
                }, 50);
            }
        });
    }

    refresh() {
        this.loadingRequest = Observable.forkJoin(
            this.partyService.getParty(),
            this.inventoryService.getInventory()
        );

        this.loadingRequest.subscribe(res => {
            this.inventory = res[1];

            for (let i = 0; i < this.inventory.length; i++) {
                this.inventory[i].itemName = this.inventory[i].name;
            }

            for (let i = 0; i < res[0].length; i++) {
                this.party[i].currHp = res[0][i].currHp;
                this.party[i].currMp = res[0][i].currMp;
            }

            setTimeout(() => {
                this.message = null;
            }, 2000);
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
        this.message = null;

        let randomNumber = Math.floor(Math.random() * (100 - 0 + 1)) + 0;

        if (randomNumber >= 50) {
            this.message = 'Successfully escaped!'
            setTimeout(() => {
                this.message = null;
                this.combatState.emit(false);
            }, 500);

            return;
        }

        this.message = 'Failed to escape!'
        setTimeout(() => {
            this.message = null;
        }, 2000);

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
        this.message = null;

        // selects party member index for element ref (for resetting load bar)
        if (partyMemberIndex || partyMemberIndex === 0) {
            this.partyMemberSelected = partyMemberIndex;
        }

        this.options = [];

        if (actionSelected === 'ability') {
            this.options.push({
                spellName: 'Attack',
                base: 50,
                cost: 0,
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
                if (this.enemies[i] === null) {
                    continue;
                }

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

        if (this.selectedItem) {
            let selection = this.selectedItem;
            selection.partyId = obj.id;

            this.loadingRequest = this.inventoryService.use(selection);
            this.loadingRequest.subscribe(
                res => {
                    this.loadingRequest = null;

                    if (selection.healingAmount) {
                        this.message = `${selection.itemName} heals ${obj.name} for ${selection.healingAmount}HP.`;
                    } else if (selection.mpHealingAmount) {
                        this.message = `${selection.itemName} restores ${selection.mpHealingAmount}MP to ${obj.name}.`
                    }

                    this.refresh();
                });
        }

        else if (this.selectedSpell) {
            let selection = this.selectedSpell;
            selection.memberUsedOn = obj.id;
            selection.memberUsing = this.party[this.partyMemberSelected].id;

            let healingAmount = selection.base + this.party[this.partyMemberSelected].addedMagDmgOrHealing + this.randomAddedDmgorHealing;

            if (this.party[this.partyMemberSelected].currMp < selection.cost) {
                this.message = `Not enough MP.`;
                return;
            }

            this.loadingRequest = this.partyService.useFriendlySpell(selection);
            this.loadingRequest.subscribe(
                res => {
                    if (selection.spellType === 'Heal') {
                        this.message = `${selection.spellName} heals ${obj.name} for ${healingAmount} HP.`;
                    }

                    this.loadingRequest = null;
                    this.refresh();
                });
        }

        let barElement: ElementRef = this.progressBar.toArray()[this.partyMemberSelected];
        this.ngxAni.to(barElement, 0, {
            width: '0%'
        });

        setTimeout(() => {
            this.party[this.partyMemberSelected].showActions = false;
            this.beginLoad(this.partyMemberSelected, this.party[this.partyMemberSelected].loadTime);
        }, 100);
    }

    useOnEnemy(obj) {
        this.closeOptions();

        if (this.selectedItem) {
            // not implemented
            return;
        }

        else if (this.selectedSpell) {
            let selection = this.selectedSpell;
            selection.memberUsing = this.party[this.partyMemberSelected].id;
            let dmgAmount: number;

            switch (selection.spellType) {
                case 'Physical':
                    dmgAmount = selection.base + this.party[this.partyMemberSelected].addedPhysDmg + this.randomAddedDmgorHealing;
                    break;
                case 'Magic':
                    dmgAmount = selection.base + this.party[this.partyMemberSelected].addedMagDmgOrHealing + this.randomAddedDmgorHealing;
                    break;
            }

            if (this.party[this.partyMemberSelected].currMp < selection.cost) {
                this.message = `Not enough MP.`;
                return;
            }

            this.loadingRequest = this.partyService.useHostileSpell(selection);
            this.loadingRequest.subscribe(
                res => { this.refresh(); });

            this.message = `${selection.spellName} damages ${this.enemies[obj.index].name} for ${dmgAmount}.`;

            if (dmgAmount > this.enemies[obj.index].currHp) {
                // enemy defeated
                this.enemies[obj.index] = null;
                this.checkIfVictory();
            } else {
                // attack enemy
                let newHp = this.enemies[obj.index].currHp - dmgAmount;
                this.enemies[obj.index].currHp = newHp;
            }

        }

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


    enemyAttack() {

    }

    checkIfVictory() {
        let enemiesAlive = 0;

        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i] !== null) {
                enemiesAlive = enemiesAlive + 1;
            }
        }

        if (enemiesAlive === 0) {
            this.message = 'Battle won!'
            setTimeout(() => {
                this.message = null;
                this.combatState.emit(false);
            }, 500);
        }
    }

    closeOptions() {
        this.showOptions = false;
    }

}