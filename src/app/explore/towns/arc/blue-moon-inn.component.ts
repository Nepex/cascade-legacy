import { Component, OnInit, OnChanges } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'underscore';

import { UserService, PartyService } from '../../../api/index';

@Component({
    selector: 'app-arc-blue-moon-inn',
    templateUrl: 'blue-moon-inn.html',
    styleUrls: ['../towns.css'],
    animations: [
        trigger('visibilityChanged', [
            state('hidden', style({ display: 'none', opacity: 0 })),
            state('shown', style({ display: 'block', opacity: 1 })),

            transition('hidden => shown', animate('1000ms ease-in')),
            transition('shown => hidden', animate('1000ms ease-out'))
        ])
    ]
})
export class ArcBlueMoonInnComponent implements OnInit {

    blackScreen = 'hidden';

    portrait;
    speakerName;
    dialogue;
    backdrop;
    continueAllowed;
    backAllowed;
    decisionAllowed;
    zoneTitle;
    leaveAllowed;

    user: any = {};
    loadingRequest: Observable<any>;

    constructor(private userService: UserService, private router: Router, private partyService: PartyService) {
    }

    ngOnInit() {
        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser()
        );

        this.loadingRequest.subscribe(res => {
            this.user = res[0];
        });

        this.continueAllowed = true;
        this.backAllowed = true;
        this.decisionAllowed = false;
        this.zoneTitle = 'Arc (Blue Moon Inn)';
        this.backdrop = 'arc-blue-moon-inn2.jpg';
        this.speakerName = 'Lisbeth';
        this.portrait = 'arc-lisbeth.png';
        this.dialogue = 'Would you like to stay for <i class="fa fa-diamond"></i>15?';
    }

    refresh() {
        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser(),
        );

        this.loadingRequest.subscribe(res => {
            this.user = res[0];
        });
    }

    progressDialogue(e) {
        if (e < 0) {
            this.router.navigateByUrl('/arc');
        } else if (e === 0) {
            // asking if wants to stay at inn
            this.continueAllowed = true;
            this.backAllowed = true;
            this.decisionAllowed = false;
            this.speakerName = 'Lisbeth';
            this.portrait = 'arc-lisbeth.png';
            this.dialogue = 'Would you like to stay for <i class="fa fa-diamond"></i>15?';
        } else if (e === 1) {
            // decision
            this.continueAllowed = false;
            this.backAllowed = false;
            this.decisionAllowed = true;
            this.speakerName = null;
            this.portrait = null;
            this.dialogue = null;
        } else if (e === 2) {
            // sleep at inn if there is enough
            this.blackScreen = 'shown';

            setTimeout(() => {
                this.loadingRequest = this.partyService.useInn(15);

                this.loadingRequest.subscribe(res => {
                    if (res['_body'] === 'insufficient funds') {
                        this.blackScreen = 'hidden';

                        this.continueAllowed = true;
                        this.backAllowed = false;
                        this.decisionAllowed = false;
                        this.speakerName = null;
                        this.portrait = null;
                        this.dialogue = 'Insufficient funds.';
                    } else {
                        this.blackScreen = 'hidden';

                        this.leaveAllowed = true;
                        this.backAllowed = false;
                        this.decisionAllowed = false;
                        this.zoneTitle = 'Arc (Blue Moon Inn)';
                        this.backdrop = 'arc-blue-moon-inn2.jpg';
                        this.speakerName = null;
                        this.portrait = null;
                        this.dialogue = 'Your party members wake up feeling refreshed.';

                        this.refresh();
                    }
                });
            }, 2000);
        } else if (e === 3) {
            this.router.navigateByUrl('/arc');
        }
    }
}
