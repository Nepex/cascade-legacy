import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'underscore';

import { UserService } from '../../api/index';
import { AlertMessages } from '../../layout/alert-messages.component';

@Component({
    selector: 'app-arc-general-store',
    templateUrl: 'general-store.html',
    styleUrls: ['arc.css']
})
export class ArcGeneralStoreComponent implements OnInit {

    shopWindow = 'hidden';

    portrait;
    speakerName;
    dialogue;
    backdrop;
    continueAllowed;
    backAllowed;
    zoneTitle;
    decisionAllowed;
    leaveAllowed;
    showShop = false;

    user: any = {};
    messages: AlertMessages[] = [];
    loadingRequest: Observable<any>;

    constructor(private userService: UserService, private router: Router) {
    }

    ngOnInit() {
        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser()
        );

        this.loadingRequest.subscribe(res => {
            this.user = res[0];
        });

        this.backAllowed = true;
        this.continueAllowed = true;
        this.zoneTitle = 'Arc (General Store)';
        this.backdrop = 'arc-general-store.jpg';
        this.speakerName = 'Lucca';
        this.portrait = 'arc-lucca.png';
        this.dialogue = 'We sell potions and other curatives. Would you like to look?';
    }

    progressDialogue(e) {
        if (e < 0) {
            this.router.navigateByUrl('/arc');
        } else if (e === 0) {
            // ask if user wants to shop
            this.backAllowed = true;
            this.continueAllowed = true;
            this.zoneTitle = 'Arc (General Store)';
            this.backdrop = 'arc-general-store.jpg';
            this.speakerName = 'Lucca';
            this.portrait = 'arc-lucca.png';
            this.dialogue = 'We sell potions and other curatives. Would you like to look?';
        } else if (e === 1) {
            // decision
            this.continueAllowed = false;
            this.backAllowed = false;
            this.decisionAllowed = true;
            this.speakerName = null;
            this.portrait = null;
            this.dialogue = null;
        } if (e === 2) {
            // if yes, open shop window
            this.decisionAllowed = false;
            this.leaveAllowed = true;
            this.showShop = true;
        } if (e === 3) {
            this.router.navigateByUrl('/arc');
        }
    }
}
