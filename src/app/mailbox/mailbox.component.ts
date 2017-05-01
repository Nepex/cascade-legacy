import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'underscore';

import { UserService, PartyService, MailboxService } from '../api/index';
import { AlertMessages } from '../layout/alert-messages.component';

@Component({
    selector: 'app-mailbox',
    templateUrl: 'mailbox.html',
    styleUrls: ['mailbox.css']
})
export class MailboxComponent {

    user: any = {};
    messages: AlertMessages[] = [];
    loadingRequest: Observable<any>;
    currentPage = 1;

    constructor(private userService: UserService, private partyService: PartyService, private mailboxService: MailboxService) {
    }

    ngOnInit() {
        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser(),
        );

        this.loadingRequest.subscribe(res => {
            this.user = res[0];
        });
    }
}
