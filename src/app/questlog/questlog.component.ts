import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'underscore';

import { UserService, MailboxService } from '../api/index';
import { AlertMessages } from '../layout/alert-messages.component';
import { QuestService } from '../api/index';

@Component({
    selector: 'app-questlog',
    templateUrl: 'questlog.html',
    styleUrls: ['questlog.css']
})
export class QuestLogComponent {

    user: any = {};
    quests = [];
    messages: AlertMessages[] = [];
    loadingRequest: Observable<any>;
    removeRequest: Observable<any>;
    currentPage = 1;
    questLogEmpty = false;

    constructor(private userService: UserService, private mailboxService: MailboxService,
        private modalService: NgbModal, private questService: QuestService) {
    }

    ngOnInit() {
        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser(),
            this.questService.getQuests()
        );

        this.loadingRequest.subscribe(res => {
            this.user = res[0];
            this.quests = res[1];

            if (this.quests.length === 0) {
                this.messages.push({
                    message: "Your questlog is empty",
                    type: "error"
                });

                this.questLogEmpty = true;
            }
        });
    }
}
