import { Component, Input, Output, ViewChildren, ElementRef, AfterViewInit, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxAni, NgxCss } from 'ngxani';

import { UserService, PartyService, InventoryService, EnemyService } from '../api/index';

@Component({
    selector: 'cascade-battle',
    templateUrl: './battle.html',
    styleUrls: ['./battle.css']
})

export class BattleComponent {
    @ViewChildren('progressBar') progressBar;
    @ViewChildren('partySprite') partySprite;
    @ViewChildren('enemySprite') enemySprite;

    @Input() zone: string;
    @Input() enemies: any;
    @Output() combatState = new EventEmitter<any>();

    user: any;
    party: any;
    partyMembersAlive = [];
    inventory: any;
    message: string;

    enemyIntervals = [];
    options = [];
    combatEnded = false;
    showOptions = false;
    showBattleMenu = true;
    selectedSpell = null;
    selectedItem = null;
    partyMemberSelected = null;
    enemySelected = null;
    expReward = 0;
    randomAddedDmgorHealing = Math.floor(Math.random() * 10 + 1);

    loadingRequest: Observable<any>;
    attackRequest: Observable<any>;

    constructor(private userService: UserService, private partyService: PartyService, private inventoryService: InventoryService,
        private ngxAni: NgxAni, private ngxCss: NgxCss, private elRef: ElementRef, private router: Router, private enemyService: EnemyService) {
        this.activate();
    }

    activate() {
        this.loadingRequest = this.userService.setInCombat();
        this.loadingRequest.subscribe(res => {
            this.loadingRequest = null;
        });

        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser(),
            this.partyService.getParty(),
            this.inventoryService.getInventory()
        );

        this.loadingRequest.subscribe(res => {
            this.loadingRequest = null;

            this.user = res[0];
            this.party = res[1];
            this.inventory = res[2];

            // timeout to compensate for ngfor populating to pick up element refs (not sure of a better way)
            setTimeout(() => {
                for (let i = 0; i < this.inventory.length; i++) {
                    this.inventory[i].itemName = this.inventory[i].name;
                }

                for (let i = 0; i < this.enemies.length; i++) {
                    this.enemies[i].enemyName = this.enemies[i].name;
                    this.enemies[i].index = i;
                    this.expReward = this.expReward + this.enemies[i].exp;

                    this.enemies[i].physDmgReduction = this.enemies[i].def / 100;
                    this.enemies[i].magDmgReduction = this.enemies[i].res / 100;
                    this.enemies[i].addedPhysDmg = this.enemies[i].str * 3;
                    this.enemies[i].addedMagDmgOrHealing = this.enemies[i].mag * 3;

                    let baseTime = 4000;
                    let minusMs = this.enemies[i].hst * 10;
                    this.enemies[i].loadTime = baseTime - minusMs;

                    this.enemyIntervals.push(setInterval(() => {
                        this.enemyAttack(this.enemies[i]);
                    }, this.enemies[i].loadTime));
                }

                for (let i = 0; i < this.party.length; i++) {
                    this.party[i].partyName = this.party[i].name;

                    this.party[i].physDmgReduction = this.party[i].def / 100;
                    this.party[i].magDmgReduction = this.party[i].res / 100;
                    this.party[i].addedPhysDmg = this.party[i].str * 3;
                    this.party[i].addedMagDmgOrHealing = this.party[i].mag * 3;

                    let baseTime = 4000;
                    let minusMs = this.party[i].hst * 10;
                    this.party[i].loadTime = baseTime - minusMs;

                    this.party[i].showActions = false;

                    if (this.party[i].currHp > 0) {
                        this.partyMembersAlive.push(this.party[i]);
                    }

                    this.beginLoad(i, this.party[i].loadTime);
                }
            }, 50);
        });
    }

    updatePartyHpMp() {
        this.loadingRequest = Observable.forkJoin(
            this.partyService.getParty(),
            this.inventoryService.getInventory()
        );

        this.loadingRequest.subscribe(res => {
            this.loadingRequest = null;

            this.inventory = res[1];

            for (let i = 0; i < this.inventory.length; i++) {
                this.inventory[i].itemName = this.inventory[i].name;
            }

            for (let i = 0; i < res[0].length; i++) {
                this.party[i].currHp = res[0][i].currHp;
                this.party[i].currMp = res[0][i].currMp;
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
        this.message = null;

        let randomNumber = Math.floor(Math.random() * (100 - 0 + 1)) + 0;

        if (randomNumber >= 50) {
            this.message = 'Successfully escaped!'
            setTimeout(() => {
                for (let i = 0; i < this.enemies; i++) {
                    clearInterval(this.enemyIntervals[i]);
                }

                this.enemies = null;
                this.message = null;
                this.userService.setOutCombat();
                this.combatState.emit(false);
            }, 500);

            return;
        }

        this.message = 'Failed to escape!'
        this.clearMessage();

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

            if (obj.spells) {
                for (let i = 0; i < obj.spells.length; i++) {
                    this.options.push(obj.spells[i]);
                }
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
        this.checkIfInCombat();
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

                    this.updatePartyHpMp();
                    this.clearMessage();
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

            this.loadingRequest = this.partyService.useFriendlySpell(selection, healingAmount);
            this.loadingRequest.subscribe(
                res => {
                    this.loadingRequest = null;

                    if (selection.spellType === 'Heal') {
                        this.message = `${selection.spellName} heals ${obj.name} for ${healingAmount} HP.`;
                    }

                    this.updatePartyHpMp();
                    this.clearMessage();
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
        this.checkIfInCombat();
        this.closeOptions();

        if (this.selectedItem) {
            // not implemented
            return;
        }

        else if (this.selectedSpell) {
            let selection = this.selectedSpell;
            selection.memberUsing = this.party[this.partyMemberSelected].id;

            let preReducAmount;
            let dmgReduc;
            let dmgAmount;

            switch (selection.spellType) {
                case 'Physical':
                    preReducAmount = selection.base + this.party[this.partyMemberSelected].addedPhysDmg + this.randomAddedDmgorHealing;
                    dmgReduc = Math.floor(preReducAmount * this.enemies[obj.index].physDmgReduction);
                    dmgAmount = preReducAmount - dmgReduc;
                    break;
                case 'Magic':
                    preReducAmount = selection.base + this.party[this.partyMemberSelected].addedMagDmgOrHealing + this.randomAddedDmgorHealing;
                    dmgReduc = Math.floor(preReducAmount * this.enemies[obj.index].magDmgReduction);
                    dmgAmount = preReducAmount - dmgReduc;
                    break;
            }

            if (this.party[this.partyMemberSelected].currMp < selection.cost) {
                this.message = `Not enough MP.`;
                this.clearMessage();
                return;
            }

            this.loadingRequest = this.partyService.useHostileSpell(selection);
            this.loadingRequest.subscribe(
                res => {
                    this.loadingRequest = null;
                    this.updatePartyHpMp();
                });

            let partySpriteEle: ElementRef = this.partySprite.toArray()[this.partyMemberSelected];

            this.ngxAni.to(partySpriteEle, 0.5, {
                "transform": "translate3d(-50px, 0, 0) rotate(0deg)",
                "-webkit-transform": "translate3d(-50px, 0, 0) rotate(0deg)",
                "-ms-transform": "translate3d(-50px, 0, 0) rotate(0deg)"
            });

            setTimeout(() => {
                this.ngxAni.to(partySpriteEle, 0.5, {
                    "transform": "translate3d(0px, 0, 0) rotate(0deg)",
                    "-webkit-transform": "translate3d(0px, 0, 0) rotate(0deg)",
                    "-ms-transform": "translate3d(0px, 0, 0) rotate(0deg)"
                });
            }, 500)

            this.message = `${selection.spellName} damages ${this.enemies[obj.index].name} for ${dmgAmount}.`;

            if (dmgAmount > this.enemies[obj.index].currHp) {
                // enemy defeated
                this.enemies[obj.index] = null;
                this.isBattleOver();
            } else {
                // attack enemy
                let newHp = this.enemies[obj.index].currHp - dmgAmount;
                this.enemies[obj.index].currHp = newHp;
                this.clearMessage();
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


    enemyAttack(enemy) {
        this.checkIfInCombat();

        if (enemy) {
            if (enemy.currHp <= 0 || this.combatEnded) {
                clearInterval(this.enemyIntervals[enemy.index]);
                return;
            }

            let randomIndex = Math.floor(Math.random() * this.partyMembersAlive.length);

            let preReducAmount = enemy.attackDmg + this.randomAddedDmgorHealing + enemy.addedPhysDmg;
            let dmgReduc = Math.floor(preReducAmount * this.partyMembersAlive[randomIndex].physDmgReduction);
            let dmgAmount = preReducAmount - dmgReduc;

            this.attackRequest = this.enemyService.enemyAttack(this.partyMembersAlive[randomIndex], dmgAmount);

            this.attackRequest.subscribe(() => {
                this.updatePartyHpMp();
                this.attackRequest = null;
            });

            let enemySpriteEle: ElementRef = this.enemySprite.toArray()[enemy.index];

            this.ngxAni.to(enemySpriteEle, 0.5, {
                "transform": "translate3d(-50px, 0, 0) rotate(0deg)",
                "-webkit-transform": "translate3d(-50px, 0, 0) rotate(0deg)",
                "-ms-transform": "translate3d(-50px, 0, 0) rotate(0deg)"
            });

            setTimeout(() => {
                this.ngxAni.to(enemySpriteEle, 0.5, {
                    "transform": "translate3d(0px, 0, 0) rotate(0deg)",
                    "-webkit-transform": "translate3d(0px, 0, 0) rotate(0deg)",
                    "-ms-transform": "translate3d(0px, 0, 0) rotate(0deg)"
                });
            }, 500)

            this.message = `${enemy.name} attacks ${this.partyMembersAlive[randomIndex].name} for ${dmgAmount}`;

            if (dmgAmount > this.partyMembersAlive[randomIndex].currHp) {
                // remove defeated party member
                this.partyMembersAlive.splice(randomIndex, 1);
            }

            this.isBattleOver();
            this.clearMessage();
        }
    }

    isBattleOver() {
        this.checkIfInCombat();

        let enemiesAlive = 0;
        let partyMembersAlive = [];
        let partyMembersLevelUp = [];

        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i] !== null) {
                enemiesAlive = enemiesAlive + 1;
            }
        }

        for (let i = 0; i < this.party.length; i++) {
            if (this.party[i].currHp <= 0) {
                continue;
            }

            partyMembersAlive.push(this.party[i]);
        }

        this.partyMembersAlive = partyMembersAlive;

        // if no party member is alive, redirect
        if (this.partyMembersAlive.length === 0) {
            this.message = 'Your party has been defeated.';
            this.showBattleMenu = false;
            this.combatEnded = true;
            this.userService.setOutCombat();

            setTimeout(() => {
                this.router.navigateByUrl('/party');
            }, 3000)
            return;
        }

        if (enemiesAlive === 0) {
            let dividedExp = this.expReward / this.partyMembersAlive.length;

            //reward exp
            this.loadingRequest = this.partyService.rewardExp(dividedExp, this.partyMembersAlive);

            this.loadingRequest.subscribe(res => {
                this.loadingRequest = null;

                this.message = `Battle won! ${this.expReward} exp gained.`
                this.showBattleMenu = false;
            });

            // check if party member has leveled up
            for (let i = 0; i < this.partyMembersAlive.length; i++) {
                if (dividedExp + this.partyMembersAlive[i].experience >= this.partyMembersAlive[i].experienceNeeded) {
                    partyMembersLevelUp.push(this.partyMembersAlive[i]);
                }
            }

            if (partyMembersLevelUp.length === 0) {
                this.exitCombat();
                return;
            }

            // level up party member(s)
            setTimeout(() => {
                if (partyMembersLevelUp.length === 1) {
                    this.message = `${partyMembersLevelUp[0].name} has leveled up!`;
                } else {
                    let content = '';

                    for (let i = 0; i < partyMembersLevelUp.length; i++) {
                        content += partyMembersLevelUp[i].name + ', ';
                    }

                    content += 'have gained levels!';

                    this.message = content;
                }
            }, 2000);

            this.loadingRequest = this.partyService.levelUp(partyMembersLevelUp);
            this.loadingRequest.subscribe(res => {
                this.loadingRequest = null;
            });

            this.exitCombat();
            this.userService.setOutCombat();
        } else {
            this.clearMessage();
        }
    }

    closeOptions() {
        this.showOptions = false;
    }

    clearMessage() {
        setTimeout(() => {
            this.message = null;
        }, 2000);
    }

    checkIfInCombat() {
        if (this.user.combat === 'false') {
            this.combatState.emit(false);
        }
    }

    exitCombat() {
        setTimeout(() => {
            this.combatState.emit(false);
        }, 4000);
    }

}