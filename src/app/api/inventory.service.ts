import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ParamSerializer } from './param-serializer';
import { SessionStateService } from './session-state.service';
import { InventoryConversion } from './inventory-conversion';
import { Environment } from './environment';

@Injectable()
export class InventoryService {
    constructor(private http: Http, private paramSerializer: ParamSerializer, private sessionStateService: SessionStateService, private environment: Environment,
        private inventoryConversion: InventoryConversion) { }

    itemMapping: Items[] = [
        { id: 'empty', name: 'Empty', icon: 'empty.png', description: 'This slot is empty.' },

        // armor
        { id: 'leather_cap', name: 'Leather Cap', icon: 'leather_cap.png', bonusDef: 1, description: 'A cap made of leather.', equippable: true },
        { id: 'leather_vest', name: 'Leather Vest', icon: 'leather_vest.png', bonusDef: 1, description: 'A vest made of leather.', equippable: true },

        // weapons
        { id: 'practice_sword', name: 'Practice Sword', icon: 'practice_sword.png', bonusStr: 1, description: 'A beginner-level sword.', equippable: true },
        { id: 'practice_wand', name: 'Practice Wand', icon: 'practice_wand.png', bonusMag: 1, description: 'A beginner-level wand.', equippable: true }
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

            let inventoryBeforeMap = this.inventoryConversion.createInventoryObj(response[0]);

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

                let mappedItem: Items = {
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
}

export class Items {
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
    usable?: boolean
}