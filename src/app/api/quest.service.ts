import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ParamSerializer } from './param-serializer';
import { SessionStateService } from './session-state.service';
import { ObjConversion } from './obj-conversion';
import { Environment } from './environment';

@Injectable()
export class QuestService {
    constructor(private http: Http, private paramSerializer: ParamSerializer, private sessionStateService: SessionStateService, private environment: Environment,
    private objConversion: ObjConversion) { }
    
    // map quests
    questMapping: Quest[] = [];

    getQuests() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let url = `${this.environment.baseApiUrl}/gets/get-quests.php`;

        let req = this.http.get(url, {
            headers: headers
        }).map(res => {
            let response = res.json();
            let quests = [];

            let questBeforeMap = this.objConversion.convertObj(response[0])

            if (questBeforeMap.length > 0) {
                for (let i = 0; i < response.length; i++) {
                    quests.push(this.getQuest(response[i].item));
                }
            }

            return quests;
        });

        return req;
    }

    getQuest(quest) {
        for (let i = 0; i < this.questMapping.length; i++) {
            if (quest === this.questMapping[i].id) {

                let mappedQuest: Quest = {
                    id: this.questMapping[i].id,
                    name: this.questMapping[i].name
                };

                return mappedQuest;
            }
        }
    }

    complete(quest) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let url = `${this.environment.baseApiUrl}/puts/complete-quest.php`;

        let req = this.http.put(url, quest, {
            headers: headers
        }).map(res => res);

        return req;
    }
}

export class Quest {
    id: string;
    name: string;
    reward?: any;
}