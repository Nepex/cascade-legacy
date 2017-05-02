import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'underscore';

import { UserService, PartyService, MailboxService } from '../api/index';
import { AlertMessages } from '../layout/alert-messages.component';
import { ReadMessageComponent } from './read-message.component';
import { SendMessageComponent } from './send-message.component';
import { ConfirmModalComponent } from '../layout/confirm-modal.component';

@Component({
    selector: 'app-mailbox',
    templateUrl: 'mailbox.html',
    styleUrls: ['mailbox.css']
})
export class MailboxComponent {

    user: any = {};
    mail = [];
    messages: AlertMessages[] = [];
    loadingRequest: Observable<any>;
    removeRequest: Observable<any>;
    currentPage = 1;
    newMessages = 0;
    newMessagesLoaded = false;

    constructor(private userService: UserService, private partyService: PartyService, private mailboxService: MailboxService,
        private modalService: NgbModal) {
    }

    ngOnInit() {
        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser(),
            this.mailboxService.getMessages()
        );



        this.loadingRequest.subscribe(res => {
            this.user = res[0];
            this.mail = res[1];

            this.mail = this.mail.reverse();

            if (!this.newMessagesLoaded) {
                for (let i = 0; i < this.mail.length; i++) {
                    if (this.mail[i].read === 'false') {
                        this.newMessages++;
                    }
                }
                this.newMessagesLoaded = true;
            }
        });

    }

    confirmRemove(id: number) {
        const modalRef = this.modalService.open(ConfirmModalComponent);
        modalRef.componentInstance.message = 'Are you sure you want to remove this message?';

        modalRef.result.then((result) => {
            this.remove(id);
        }, (reason) => { });
    }

    remove(m) {
        this.messages = [];

        if (this.removeRequest) {
            return;
        }

        this.removeRequest = this.mailboxService.remove(m.id);
        this.removeRequest.subscribe(
            () => {
                this.removeRequest = null;
                this.messages.push({ message: 'Message was deleted', type: 'success' });
                this.ngOnInit();
            });
    }

    displayMessage(m) {
        const modalRef = this.modalService.open(ReadMessageComponent);
        modalRef.componentInstance.message = m;

        modalRef.result.then((result) => {
            this.newMessages = 0;
            this.newMessagesLoaded = false;
            this.ngOnInit();
            this.messages = [];
        }, (reason) => {
            this.newMessages = 0;
            this.newMessagesLoaded = false;
            this.ngOnInit();
            this.messages = [];
        });

        return false;
    }

    sendMessage() {
        const modalRef = this.modalService.open(SendMessageComponent);

        modalRef.result.then((result) => {
            this.newMessages = 0;
            this.newMessagesLoaded = false;
            this.ngOnInit();

            this.messages = [];
            this.messages.push({
                message: 'Message sent',
                type: 'success'
            });
        }, (reason) => {
        });
    }
}
