import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
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
export class MailboxComponent implements OnInit, OnDestroy {

    user: any = {};
    mail = [];
    messages: AlertMessages[] = [];
    loadingRequest: Observable<any>;
    removeRequest: Observable<any>;
    refreshCycle: Subscription;
    currentPage = 1;

    cachedNewMessages = 0;
    newMessages = 0;
    newMessagesLoaded = false;

    constructor(private userService: UserService, private partyService: PartyService, private mailboxService: MailboxService,
        private modalService: NgbModal) {
        this.activate();
    }

    activate() {
        this.refreshCycle = Observable.timer(0, 10000).subscribe(() => {
            this.updateMessages();
        });
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

            this.cachedNewMessages = 0;

            if (!this.newMessagesLoaded) {
                for (let i = 0; i < this.mail.length; i++) {
                    if (this.mail[i].read === 'false') {
                        this.cachedNewMessages++;
                    }
                }

                this.newMessages = this.cachedNewMessages;
                this.newMessagesLoaded = true;
            }
        });
    }

    ngOnDestroy() {
        this.refreshCycle.unsubscribe();
    }

    updateMessages() {
        this.newMessagesLoaded = false;
        this.ngOnInit();
    }

    confirmRemove(id) {
        const modalRef = this.modalService.open(ConfirmModalComponent);
        modalRef.componentInstance.message = 'Are you sure you want to remove message(s)?';

        modalRef.result.then(() => {
            this.remove(id);
        });
    }

    remove(m) {
        this.messages = [];

        if (this.removeRequest) {
            return;
        }

        if (m === 'all') {
            this.removeRequest = this.mailboxService.remove(m);
            var message = 'All messages removed';
        } else {
            this.removeRequest = this.mailboxService.remove(m.id);
            var message = 'Message removed';
        }

        this.removeRequest.subscribe(
            () => {

                this.removeRequest = null;
                this.newMessages = 0;
                this.newMessagesLoaded = false;
                this.ngOnInit();
                this.messages.push({ message: message, type: 'success' });
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
    }

    sendMessage() {
        const modalRef = this.modalService.open(SendMessageComponent);
    }
}
