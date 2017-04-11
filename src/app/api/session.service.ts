import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { SessionStateService } from './session-state.service';
import { Observable } from 'rxjs/Observable';

import { ParamSerializer } from './param-serializer';

@Injectable()
export class SessionService {

    private oneTimeTokenUrl: string;
    private sessionUrl: string;

    constructor(private sessionStateService: SessionStateService, private http: Http, private paramSerializer: ParamSerializer) {
        // this.oneTimeTokenUrl = `${environment.apiBaseUrl}/sessions/onetimetoken`;
        // this.sessionUrl = `http://127.0.0.1/cascade-api/authenticate.php`;
    }

    getOneTimeToken(): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'text/plain');
        headers.append('Authorization', `Bearer ${this.sessionStateService.getToken()}`);

        let req = this.http.get(this.oneTimeTokenUrl, {
            headers: headers
        }).map((response) => response.json().token);

        return req;
    }

    logout() {
        this.sessionStateService.logout();
    }

    login(creds: any): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'text/plain');

        let serializedParams = this.paramSerializer.serialize(creds);
        let url = `http://127.0.0.1/cascade-api/authenticate.php?${serializedParams}`;

        let req = this.http.post(url, { headers: headers })
            .map((res) => {
                if (res['_body'] === 'incorrect credentials') {
                    return 'incorrect credentials';
                }
                this.sessionStateService.login(res['_body']);
                //return data;
            });

        return req;
    }
}