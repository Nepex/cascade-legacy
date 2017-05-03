import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SessionStateService, MailboxService } from '../api/index';
import { ParamSerializer } from '../api/param-serializer';
import { SettingsComponent } from './settings-modal.component';

@Component({
    selector: 'cascade-header-members',
    templateUrl: './header-members.html',
    styleUrls: ['./header-members.css']
})
export class HeaderMembersComponent {
    @Input() user;
    @Input() currency;
    mail = [];
    loadingRequest: Observable<any>;
    removeRequest: Observable<any>;
    refreshCycle: Subscription;

    newMessagesLoaded = false;
    newMessages = 0;
    cachedNewMessages = 0;
    showMenu = false;

    constructor(private sessionStateService: SessionStateService, private router: Router, private modalService: NgbModal, private mailboxService: MailboxService) {
        this.activate();
    }


    activate() {
        this.refreshCycle = Observable.timer(0, 10000).subscribe(() => {
            this.updateMessages();
        });
    }

    ngOnInit() {
        this.loadingRequest = Observable.forkJoin(
            this.mailboxService.getMessages()
        );

        this.loadingRequest.subscribe(res => {
            this.mail = res[0];

            this.mail = this.mail.reverse();

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
        this.cachedNewMessages = 0;
        this.newMessagesLoaded = false;
        this.ngOnInit();
    }


    logout() {
        this.sessionStateService.logout();
        this.router.navigateByUrl('');
    }

    displaySettings() {
        const modalRef = this.modalService.open(SettingsComponent, { size: 'sm' });
    }

    closeMenu() {
        this.showMenu = false;
    }
}