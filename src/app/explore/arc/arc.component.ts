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
        this.backdrop = 'arc.jpg';
        this.speakerName = 'Erika';
        this.portrait = 'tour-guide.png';
        this.dialogue = 'I am the tour guide here. Where would you like to go?';
    }

    nextDialogue(e) {
        if (e === 1) {
            this.dialogue = '<a href="#">Townsquare</a><br />';
            this.dialogue += '<a href="#">Blue Moon Inn</a><br />';
            this.dialogue += '<a href="#">General Store</a><br />';
            this.dialogue += '<a href="#">Equipment Shop</a>';
            this.continuable = false;
        }
    }
}
