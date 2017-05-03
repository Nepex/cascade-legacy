import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ParamSerializer } from './param-serializer';
import { SessionStateService } from './session-state.service';
import { ObjConversion } from './obj-conversion';
import { Environment } from './environment';

@Injectable()
export class InventoryService {
    constructor(private http: Http, private paramSerializer: ParamSerializer, private sessionStateService: SessionStateService, private environment: Environment,
        private objConversion: ObjConversion) { }

    itemMapping: Item[] = [
        { id: 'empty', name: 'Empty', icon: 'empty.png', description: 'This slot is empty.' },

        // armor
        { id: 'leather_cap', name: 'Leather Cap', icon: 'leather_cap.png', bonusDef: 1, description: 'A cap made of leather.', equippable: true, slot: 'helm' },
        { id: 'leather_vest', name: 'Leather Vest', icon: 'leather_vest.png', bonusDef: 1, description: 'A vest made of leather.', equippable: true, slot: 'chest' },

        // weapons
        { id: 'practice_sword', name: 'Practice Sword', icon: 'practice_sword.png', bonusStr: 1, description: 'A beginner-level sword.', equippable: true, slot: 'mainHand', jobs: ['Knight'] },
        { id: 'practice_wand', name: 'Practice Wand', icon: 'practice_wand.png', bonusMag: 1, description: 'A beginner-level wand.', equippable: true, slot: 'mainHand', jobs: ['Mage', 'Priest'] },
    
        // consumables
        { id: 'potion', name: 'Potion', icon: 'potion.png', description: 'Heals target for 100 HP.', usable: true, healingAmount: 100, sellValue: 50 }        
    ];

    getInventory() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let url = `${this.environment.baseApiUrl}/gets/get-inventory.php`;

        let req = this.http.get(url, {
            headers: headers
        }).map(res => {
            let response = res.json();
            let inventory = [];

            let inventoryBeforeMap = this.objConversion.convertObj(response[0]);

            for (let i = 0; i < inventoryBeforeMap.length; i++) {
                inventory.push(this.getItem(inventoryBeforeMap[i].item, inventoryBeforeMap[i].amount));
            }

            return inventory;
        });

        return req;
    }

    getItem(item, amount) {
        for (let i = 0; i < this.itemMapping.length; i++) {
            if (item === this.itemMapping[i].id) {

                let mappedItem: Item = {
                    id: this.itemMapping[i].id,
                    name: this.itemMapping[i].name,
                    amount: amount,
                    icon: this.itemMapping[i].icon,
                    bonusStr: this.itemMapping[i].bonusStr ? this.itemMapping[i].bonusStr : 0,
                    bonusMag: this.itemMapping[i].bonusMag ? this.itemMapping[i].bonusMag : 0,
                    bonusDef: this.itemMapping[i].bonusDef ? this.itemMapping[i].bonusDef : 0,
                    bonusRes: this.itemMapping[i].bonusRes ? this.itemMapping[i].bonusRes : 0,
                    bonusHst: this.itemMapping[i].bonusHst ? this.itemMapping[i].bonusHst : 0,
                    bonusHp: this.itemMapping[i].bonusHp ? this.itemMapping[i].bonusHp : 0,
                    bonusMp: this.itemMapping[i].bonusMp ? this.itemMapping[i].bonusMp : 0,
                    healingAmount: this.itemMapping[i].healingAmount ? this.itemMapping[i].healingAmount : 0,
                    mpHealingAmount: this.itemMapping[i].mpHealingAmount ? this.itemMapping[i].mpHealingAmount : 0,
                    damageAmount: this.itemMapping[i].damageAmount ? this.itemMapping[i].damageAmount : 0,
                    effect: this.itemMapping[i].effect ? this.itemMapping[i].effect : null,
                    description: this.itemMapping[i].description ? this.itemMapping[i].description : null,
                    equippable: this.itemMapping[i].equippable ? this.itemMapping[i].equippable : false,
                    usable: this.itemMapping[i].usable ? this.itemMapping[i].usable : false,
                    sellValue: this.itemMapping[i].sellValue ? this.itemMapping[i].sellValue : 0,
                    buyValue: this.itemMapping[i].buyValue ? this.itemMapping[i].buyValue : 0,
                    sellable: this.itemMapping[i].sellable ? this.itemMapping[i].sellable : true,
                    slot: this.itemMapping[i].slot ? this.itemMapping[i].slot : null,
                    jobs: this.itemMapping[i].jobs ? this.itemMapping[i].jobs : 'any'
                };

                return mappedItem;
            }
        }
    }

    unequip(item) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let url = `${this.environment.baseApiUrl}/puts/unequip-item.php`;

        let req = this.http.put(url, item, {
            headers: headers
        }).map(res => res);

        return req;
    }

    equip(item) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let url = `${this.environment.baseApiUrl}/puts/equip-item.php`;

        let req = this.http.put(url, item, {
            headers: headers
        }).map(res => res);

        return req;
    }

    use(item) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let url = `${this.environment.baseApiUrl}/puts/use-item.php`;

        let req = this.http.put(url, item, {
            headers: headers
        }).map(res => res);

        return req;
    }

    sell(item) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let url = `${this.environment.baseApiUrl}/puts/sell-item.php`;

        let req = this.http.put(url, item, {
            headers: headers
        }).map(res => res);

        return req;
    }
}

export class Item {
    id: string;
    name: string;
    amount?: number;
    icon: string;
    bonusStr?: number;
    bonusMag?: number;
    bonusDef?: number;
    bonusRes?: number;
    bonusHst?: number;
    bonusHp?: number;
    bonusMp?: number;
    healingAmount?: number;
    mpHealingAmount?: number;
    damageAmount?: number;
    effect?: string;
    description?: string;
    equippable?: boolean;
    usable?: boolean;
    sellable?: boolean;
    sellValue?: number;
    buyValue?: number;
    slot?: string;
    jobs?: string[] | string;
}