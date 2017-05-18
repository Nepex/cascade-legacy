import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ParamSerializer } from './param-serializer';
import { SessionStateService } from './session-state.service';
import { Environment } from './environment';

@Injectable()
export class EnemyService {
    enemyMapping: Enemy[] = [
        { id: 'thunderhawk', name: 'Thunderhawk', level: 1, currHp: 100, hp: 100, str: 10, def: 10, res: 10, hst: 10, sprite: 'thunderhawk.png', exp: 50, attackDmg: 20 }
    ];

    constructor(private http: Http, private paramSerializer: ParamSerializer, private sessionStateService: SessionStateService, private environment: Environment) { }

    getEnemy(id) {
        for (let i = 0; i < this.enemyMapping.length; i++) {
            if (id === this.enemyMapping[i].id) {

                let mappedItem: Enemy = {
                    id: this.enemyMapping[i].id,
                    name: this.enemyMapping[i].name,
                    level: this.enemyMapping[i].level ? this.enemyMapping[i].level : 0,
                    str: this.enemyMapping[i].str,
                    mag: this.enemyMapping[i].mag ? this.enemyMapping[i].mag : 0,
                    def: this.enemyMapping[i].def,
                    res: this.enemyMapping[i].res,
                    hst: this.enemyMapping[i].hst,
                    hp: this.enemyMapping[i].hp,
                    currHp: this.enemyMapping[i].currHp,
                    mp: this.enemyMapping[i].mp ? this.enemyMapping[i].mp : 0,
                    currMp: this.enemyMapping[i].currMp ? this.enemyMapping[i].currMp : 0,
                    sprite: this.enemyMapping[i].sprite,
                    exp: this.enemyMapping[i].exp,
                    attackDmg: this.enemyMapping[i].attackDmg
                };

                return mappedItem;
            }
        }
    }

    enemyAttack(partyMember, dmgInflicted) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        partyMember.dmgInflicted = dmgInflicted;

        let url = `${this.environment.baseApiUrl}/puts/enemy-attack.php`;

        let req = this.http.put(url, partyMember, {
            headers: headers
        }).map(res => res);

        return req;
    }
}

export class Enemy {
    id: string;
    name: string;
    level: number;
    currHp: number;
    currMp?: number;
    hp: number;
    mp?: number;
    str?: number;
    mag?: number;
    def: number;
    res: number;
    hst: number;
    spells?: Spells[];
    sprite: string;
    exp: number;
    attackDmg: number;
}

export class Spells {
    spellName: string;
    cost: number;
    base: number;
    spellType: string;
    description: string;
    icon: string;
};