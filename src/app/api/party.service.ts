import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ParamSerializer } from './param-serializer';
import { SessionStateService } from './session-state.service';
import { Environment } from './environment';

@Injectable()
export class PartyService {
    constructor(private http: Http, private paramSerializer: ParamSerializer, private sessionStateService: SessionStateService, private environment: Environment) { }

    hirePartyMember(partyMember) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let serializedParams = this.paramSerializer.serialize(partyMember);
        let url = `${this.environment.baseApiUrl}/posts/hire.php?${serializedParams}`;

        return this.http.post(url, partyMember, {
            headers: headers
        });
    }

    getParty() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let url = `${this.environment.baseApiUrl}/gets/get-party.php`;

        let req = this.http.get(url, {
            headers: headers
        }).map(res => {
            let response = res.json();

            let party: Party[] = [];

            if (response) {

                for (let i = 0; i < response.length; i++) {
                    party.push({
                        id: parseInt(response[i].id),
                        owner: response[i].owner,
                        name: response[i].name,
                        job: response[i].job,
                        level: parseInt(response[i].level),
                        accessory: response[i].accessory,
                        helm: response[i].helm,
                        chest: response[i].chest,
                        mainHand: response[i].main_hand,
                        offHand: response[i].off_hand,
                        currHp: parseInt(response[i].current_hp),
                        currMp: parseInt(response[i].current_mp),
                        hp: parseInt(response[i].hp) + parseInt(response[i].bonus_hp),
                        mp: parseInt(response[i].mp) + parseInt(response[i].bonus_mp),
                        str: parseInt(response[i].strength) + parseInt(response[i].bonus_strength),
                        mag: parseInt(response[i].magic) + parseInt(response[i].bonus_magic),
                        def: parseInt(response[i].defense) + parseInt(response[i].bonus_defense),
                        res: parseInt(response[i].resistance) + parseInt(response[i].bonus_resistance),
                        hst: parseInt(response[i].haste) + parseInt(response[i].bonus_haste),
                        statPts: parseInt(response[i].stat_points),
                        experience: parseInt(response[i].experience),
                        experienceNeeded: parseInt(response[i].experience_needed),
                        sprite: response[i].sprite
                    });
                }

                for (let i = 0; i < party.length; i++) {
                    this.getSpells(party[i].name)
                        .subscribe(res => {
                            if (!res) {
                                return;
                            }
                            let spellsLearned = res;
                            for (let i = 0; i < party.length; i++) {
                                for (let j = 0; j < spellsLearned.length; j++) {
                                    if (party[i].name === spellsLearned[j].party_member) {
                                        party[i].spells = [];

                                        party[i].spells.push({
                                            spellName: spellsLearned[j].spell_name,
                                            cost: parseInt(spellsLearned[j].cost),
                                            base: parseInt(spellsLearned[j].base),
                                            spellType: spellsLearned[j].spell_type,
                                            description: spellsLearned[j].description,
                                            icon: spellsLearned[j].spell_name.toLowerCase() + '.png'
                                        });
                                    }
                                }
                            }
                        });
                }

            }

            return party;
        });

        return req;
    }

    getSpells(name) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let url = `${this.environment.baseApiUrl}/gets/get-spells.php?party_member=${name}`;

        let req = this.http.get(url, {
            headers: headers
        }).map(res => res.json());

        return req;
    }

    remove(id) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let url = `${this.environment.baseApiUrl}/deletes/remove-party-member.php?id=` + id;

        let req = this.http.delete(url, {
            headers: headers
        }).map(res => res);

        return req;
    }
}

export class Party {
    id: number;
    owner: string;
    name: string;
    job: string;
    level: number;
    accessory: string;
    helm: string
    chest: string;
    mainHand: string;
    offHand: string;
    currHp: number;
    currMp: number;
    hp: number;
    mp: number;
    str: number;
    mag: number;
    def: number;
    res: number;
    hst: number;
    spells?: Spells[];
    statPts: number;
    experience: number;
    experienceNeeded: number;
    sprite: string;
}

export class Spells {
    spellName: string;
    cost: number;
    base: number;
    spellType: string;
    description: string;
    icon: string;
};