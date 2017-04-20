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
        }).map(res => res.json());

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