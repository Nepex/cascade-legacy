import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ParamSerializer } from './param-serializer';
import { SessionStateService } from './session-state.service';

@Injectable()
export class UserService {
    constructor(private http: Http, private paramSerializer: ParamSerializer, private sessionStateService: SessionStateService) { }

    create(user): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'text/plain');

        let serializedParams = this.paramSerializer.serialize(user);
        let url = `http://127.0.0.1/cascade-api/posts/create-user.php?${serializedParams}`;

        return this.http.post(url, user, {
            headers: headers
        });
    }

    getUser() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let url = `http://127.0.0.1/cascade-api/gets/get-user.php`;

        let req = this.http.get(url, {
            headers: headers
        }).map(res => res.json());

        return req;
    }
}