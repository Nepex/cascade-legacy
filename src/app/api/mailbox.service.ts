import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ParamSerializer } from './param-serializer';
import { SessionStateService } from './session-state.service';
import { Environment } from './environment';

@Injectable()
export class MailboxService {
    constructor(private http: Http, private paramSerializer: ParamSerializer, private sessionStateService: SessionStateService, private environment: Environment) { }

    getMessages() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let url = `${this.environment.baseApiUrl}/gets/get-messages.php`;

        let req = this.http.get(url, {
            headers: headers
        }).map(res => res);

        return req;
    }

    create(message): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'text/plain');

        let url = `${this.environment.baseApiUrl}/posts/send-message.php`;

        return this.http.post(url, message, {
            headers: headers
        });
    }

    markRead(id) {
        let headers = new Headers();
        headers.append('Content-Type', 'text/plain');

        let url = `${this.environment.baseApiUrl}/posts/mark-message-read.php?id=` + id;

        return this.http.post(url, {
            headers: headers
        });
    }

    remove(id) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let url = `${this.environment.baseApiUrl}/deletes/remove-message.php?id=` + id;

        let req = this.http.delete(url, {
            headers: headers
        }).map(res => res);

        return req;
    }
}

class Message {
    sender: string;
    receiver: string;
    message: string;
    read?: string;
}