import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'underscore';

import { UserService } from '../../api/index';
import { AlertMessages } from '../../layout/alert-messages.component';

@Component({
    selector: 'app-arc',
    templateUrl: 'arc.html',
    styleUrls: ['arc.css']
})
export class ArcComponent implements OnInit {

    state = 'hidden';

    portrait;
    speakerName;
    dialogue;
    backdrop;
    continuable;
    backAllowed;
    zoneTitle;

    tourDialoguePhase = 1;
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

        this.continuable = true;
        this.backAllowed = false;
        this.zoneTitle = 'Arc';
        this.backdrop = 'arc.jpg';
        this.speakerName = 'Erika';
        this.portrait = 'arc-erika.png';
        this.dialogue = 'Welcome to Arc. I am the tour guide here. Where would you like to go?';
    }

    progressDialogue(e) {
        if (e === 0) {
            this.continuable = true;
            this.backAllowed = false;
            this.backdrop = 'arc.jpg';
            this.speakerName = 'Erika';
            this.portrait = 'arc-erika.png';
            this.dialogue = 'Welcome to Arc. I am the tour guide here. Where would you like to go?';
        }
        else if (e === 1) {
            this.dialogue = '<a href="/arc/townsquare">Townsquare</a><br />';
            this.dialogue += '<a href="/arc/blue-moon-inn">Blue Moon Inn</a><br />';
            this.dialogue += '<a href="/arc/general-store">General Store</a><br />';
            this.dialogue += '<a href="/arc/equipment-store">Equipment Store</a><br />';
            
            this.continuable = false;
            this.backAllowed = true;
        }
    }
}
