import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'underscore';

import { UserService } from '../../../api/index';
import { AlertMessages } from '../../../layout/alert-messages.component';

@Component({
    selector: 'app-arc',
    templateUrl: 'arc.html',
    styleUrls: ['../towns.css']
})
export class ArcComponent implements OnInit {

    state = 'hidden';

    portrait;
    speakerName;
    dialogue;
    backdrop;
    continueAllowed;
    backAllowed;
    zoneTitle;
    arcMenu;

    user: any = {};
    messages: AlertMessages[] = [];
    loadingRequest: Observable<any>;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.loadingRequest = Observable.forkJoin(
            this.userService.getUser()
        );

        this.loadingRequest.subscribe(res => {
            this.user = res[0];
        });

        setTimeout(() => {
            this.state = 'shown';
        }, 50);

        this.continueAllowed = true;
        this.backAllowed = false;
        this.arcMenu = false;
        this.zoneTitle = 'Arc';
        this.backdrop = 'arc.jpg';
        this.speakerName = 'Erika';
        this.portrait = 'arc-erika.png';
        this.dialogue = 'Welcome to Arc. I am the tour guide here. Where would you like to go?';
    }

    progressDialogue(e) {
        if (e === 0) {
            this.continueAllowed = true;
            this.backAllowed = false;
            this.backdrop = 'arc.jpg';
            this.speakerName = 'Erika';
            this.portrait = 'arc-erika.png';
            this.dialogue = 'Welcome to Arc. I am the tour guide here. Where would you like to go?';
        }
        else if (e === 1) {
            this.arcMenu = true;
            this.speakerName = null;
            this.portrait = null;
            this.dialogue = null;

            this.continueAllowed = false;
            this.backAllowed = true;
        }
    }
}
