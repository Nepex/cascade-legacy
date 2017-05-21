import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ParamSerializer } from './param-serializer';
import { SessionStateService } from './session-state.service';
import { Environment } from './environment';

@Injectable()
export class UserService {
    constructor(private http: Http, private paramSerializer: ParamSerializer, private sessionStateService: SessionStateService, private environment: Environment) { }

    create(user): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'text/plain');

        let serializedParams = this.paramSerializer.serialize(user);
        let url = `${this.environment.baseApiUrl}/posts/create-user.php?${serializedParams}`;

        return this.http.post(url, user, {
            headers: headers
        });
    }

    getUser() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let url = `${this.environment.baseApiUrl}/gets/get-user.php`;

        let req = this.http.get(url, {
            headers: headers
        }).map(res => {
            let response = res.json();

            let user: User = {
                currency: parseInt(response[0].currency),
                combat: response[0].combat,
                email: response[0].email,
                id: parseInt(response[0].id),
                partySlotsUnlocked: parseInt(response[0].party_slots_unlocked),
                username: response[0].username
            }

            return user;
        });

        return req;
    }

    setInCombat() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let body = {};
        let url = `${this.environment.baseApiUrl}/puts/set-in-combat.php`;

        let req = this.http.put(url, body, {
            headers: headers
        }).map(res => res);

        return req;
    }

    setOutCombat() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let body = {};
        let url = `${this.environment.baseApiUrl}/puts/set-out-combat.php`;

        let req = this.http.put(url, body, {
            headers: headers
        }).map(res => res);

        return req;
    }
}

export class User {
    currency: number;
    combat: boolean;
    email: string;
    id: number;
    partySlotsUnlocked: number;
    username: string;
}