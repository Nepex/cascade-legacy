import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'underscore';

import { UserService } from '../../api/index';
import { AlertMessages } from '../../layout/alert-messages.component';

@Component({
    selector: 'app-arc-townsquare',
    templateUrl: 'townsquare.html',
    styleUrls: ['arc.css']
})
export class ArcTownSquareComponent implements OnInit {

    state = 'hidden';

    portrait;
    speakerName;
    dialogue;
    backdrop;
    continueAllowed;
    backAllowed;
    zoneTitle;

    tourDialoguePhase = 1;
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

        setTimeout(() => {
            this.state = 'shown';
        }, 50);

        this.continueAllowed = false;
        this.backAllowed = true;
        this.zoneTitle = 'Arc (Townsquare)';
        this.backdrop = 'arc-townsquare.jpg';
        this.speakerName = 'Cyan';
        this.portrait = 'arc-cyan.png';
        this.dialogue = 'I may have a job for you soon.';
    }

    progressDialogue(e) {
        if (e < 0) {
            this.router.navigateByUrl('/arc');
        }
    }
}
