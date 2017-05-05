import { Component, OnInit, OnChanges } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'underscore';

import { UserService } from '../../api/index';
import { AlertMessages } from '../../layout/alert-messages.component';

@Component({
    selector: 'app-arc',
    templateUrl: 'arc.html',
    styleUrls: ['arc.css'],
    animations: [
        trigger('visibilityChanged', [
            state('hidden', style({ opacity: 0 })),
            state('shown', style({ opacity: 1 })),

            transition('hidden => shown', animate('1000ms ease-in'))
        ])
    ]
})
export class ArcComponent implements OnInit {

    state = 'hidden';

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
    }

    nextDialogue() {
        this.tourDialoguePhase++;
    }
}
