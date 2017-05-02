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
        }).map(res => {
            let response = res.json();

            let messages: Message[] = [];

            for (let i = 0; i < response.length; i++) {
                messages.push({
                    id: response[i].id,
                    sender: response[i].sender,
                    receiver: response[i].receiver,
                    message: response[i].message,
                    date: response[i].dateOf,
                    time: response[i].timeOf,
                    read: response[i].seen
                });
            }

            return messages;
        });

        return req;
    }

    create(message) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let url = `${this.environment.baseApiUrl}/posts/create-message.php`;

        return this.http.post(url, message, {
            headers: headers
        });
    }

    markRead(id) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `${this.sessionStateService.getToken()}`);

        let url = `${this.environment.baseApiUrl}/puts/mark-message-read.php?id=` + id;

        let req = this.http.put(url, id, {
            headers: headers
        }).map(res => res);

        return req;
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

export class Message {
    id: number;
    sender: string;
    receiver: string;
    message: string;
    read?: string;
    date?: string;
    time?: string;
}